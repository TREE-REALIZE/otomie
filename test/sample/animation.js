// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
/**
 * グラフィックの描画処理を行う関数．のちにこの関数をモジュール化する方針．
 * 
 * @param {*} _data 音全体のデータ．　
 * @param {*} _index 対象データのインデックス
 * @param {*} _canvas 描画対象キャンバス
 */
const drawCanvas = (_data, _index, _canvas) => {

    //1回の描画に必要なデータを取得する
    let frameData = _data["dataList"][_index];

    //グラフィック記述部分
    //-------------------------------------------------------
}


// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■


//ファイル選択，再生，アニメーションループ処理
{
    let reader = new FileReader();      //jsonファイルリーダー
    let dataIndex = -1;                 //再生中dataListを順に見るためのIndex
    let startTime;                      //アニメーションループを開始した時間
    let audioTime;                      //データリスト内のデルタタイムの累積
    let drawTime;                       //アニメーション描画のデルタタイムの累積

    let isPlaying = false;              //再生中状態

    let canvasFrequency;                //スペクトラムを描画するキャンバス
    let canvasRealTime;                 //グラフィックを描画するキャンバス


    //ページが読まれたときの処理
    window.addEventListener("load", () => {
        canvasFrequency = document.querySelector('#canvasFrequency');
        canvasGraphics = document.querySelector('#canvasGraphics');
        document.querySelector('[name=ButtonOpenMovie]').addEventListener("click", playDataList);
        console.log(data);
    });


    //周波数スペクトルを描画する処理
    const drawSpectCanvas = (_data, _index, _canvas) => {
        //描画処理する対象
        let fsDivN = _data.fsDivN;                   //周波数分解能 サンプリングレート(48khz)/ FFTサイズ(2048)  
        let frameData = _data["dataList"][_index];
        let rawData = frameData["raw"];

        //描画処理する対象の中の周波数データリスト
        let targetSpectDataList = rawData["frequency"];

        //描画処理する対象のキャンバス
        let targetCanvas = _canvas;
        let CanvasCtx = _canvas.getContext('2d');
        CanvasCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        CanvasCtx.beginPath();

        for (let i = 0, len = targetSpectDataList.length; i < len; i++) {
            //canvasにおさまるように線を描画
            let x = (i / len) * targetCanvas.width;
            let y = (1 - (targetSpectDataList[i] / 255)) * targetCanvas.height;
            if (i === 0) {
                CanvasCtx.moveTo(x, y);
            } else {
                CanvasCtx.lineTo(x, y);
            }
            let f = Math.floor(i * fsDivN);  // index -> frequency;

            // 500 Hz単位にy軸の線とラベル出力
            if ((f % 500) === 0) {
                let text = (f < 1000) ? (f + ' Hz') : ((f / 1000) + ' kHz');
                // Draw grid (X)
                CanvasCtx.fillRect(x, 0, 1, targetCanvas.height);
                // Draw text (X)
                CanvasCtx.fillText(text, x, targetCanvas.height);
            }
        }
        CanvasCtx.stroke();

        // // x軸の線とラベル出力
        // let textYs = ['1.00', '0.50', '0.00'];
        // for (var i = 0, len = textYs.length; i < len; i++) {
        //     let text = textYs[i];
        //     let gy = (1 - parseFloat(text)) * targetCanvas.height;
        //     // Draw grid (Y)
        //     targetCanvasContext.fillRect(0, gy, targetCanvas.width, 1);
        //     // Draw text (Y)
        //     targetCanvasContext.fillText(text, 0, gy);
        // }
    }


    //アニメーション再生・ループ
    const animateCanvases = () => {
        if (isPlaying) {
            if (dataIndex == -1) {
                dataIndex = 0;
                startTime = performance.now() / 1000;
                audioTime = data["dataList"][dataIndex].deltaTime;
            }
            
            drawSpectCanvas(data, dataIndex, canvasFrequency);
            drawCanvas(data, dataIndex, canvasGraphics);

            drawTime = (performance.now() / 1000) - startTime;
            
             //描画対象のデータのインデックスを次に進める条件
            if (audioTime <= drawTime) {
                let Time = audioTime;
                let processIndex = dataIndex;

                for (i = dataIndex; i < data["dataList"].length - 1; i++) {
                    Time += data["dataList"][i].deltaTime;

                    //描画対象のデータのインデックスを決定する条件
                    if (drawTime <= Time) {
                        processIndex = i;
                        break;
                    }
                }
                dataIndex = processIndex;
                dataIndex += 1;

                //ループする条件
                if (data["dataList"].length - 1 < dataIndex) {
                    dataIndex = -1;
                    console.log("loop");
                    requestAnimationFrame(animateCanvases);

                    return;
                }
                audioTime = Time;
            }
        }
        else {
            return;
        }
        requestAnimationFrame(animateCanvases);
    }


    //ファイル選択
    function fileChanged(input) {
        console.log(input.files);
        reader.readAsText(input.files[0], 'UTF-8');
        reader.onload = () => {
            console.log(reader.result);
            decordeJsonData(reader.result);
        }
    }

    //受けとったJsonデータをオブジェクトに変換し，dataに代入．
    const decordeJsonData = (_jsonData) => {
        data = JSON.parse(_jsonData);
        console.log(data);
    }

    //再生を開始する
    const playDataList = () => {
        if (!isPlaying) {
            isPlaying = true;
            dataIndex = -1;
            animateCanvases();
        }
    }
}