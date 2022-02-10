'use strict';

// スプラッシュ画面
{
    // スプラッシュ画面 - アニメ終わりで非表示して次へ
    const appLogoGrp = document.querySelector('.FadeOutAppLogo');
    const splashWindow = document.querySelector('#SplashWindow');
    
    const splashNone =()=> {
        splashWindow.classList.add('Displaynone');
    };
    appLogoGrp.addEventListener('animationend', splashNone);
}

// Howto画面
{
    // Howto画面 - 画面クリックでスライド
    const sliderContent = document.querySelectorAll('.SliderContent');

    const conceptCard = document.getElementById('ConceptCard');
    const clickedConceptCard = () => {
        sliderContent[0].classList.add('SlideHowtoAnim01');
        sliderContent[1].classList.add('SlideHowtoAnim01');
        sliderContent[2].classList.add('SlideHowtoAnim01');
    };
    conceptCard.addEventListener('click', clickedConceptCard);

    // Howto画面 - マイクの設定カードクリックで処理
    const micOnCard = document.getElementById("MicOnCard");
    // はじめましょうカードに移動関数
    const changeStartCard = () => {
        sliderContent[0].classList.add('SlideHowtoAnim02');
        sliderContent[1].classList.add('SlideHowtoAnim02');
        sliderContent[2].classList.add('SlideHowtoAnim02');
    }
    // マイクの設定カード押された関数
    const clickedMicOnCard = () => {
        micOn(micOnCallBack);
        drawRealTime(drawRealTimeCallBack);
    };
    micOnCard.addEventListener('click', clickedMicOnCard);

    const canvasRealTime = document.getElementById('CanvasRealTime');
    // micOnコールバック
    const micOnCallBack = {
        onReady: (tf) => {
            if (tf == true) {
                console.log("micOn-マイクアクセスが許可されました〇");
                drawRealTime(canvasRealTime, drawRealTimeCallBack); //リアルタイム描画開始呼ぶ
            }
            else {
                console.log("micOn-マイクアクセスが許可されませんでした×");
            }
        },
        onComplete: () => {
            console.log("onComplete");
        }
    };
    // drawRealTimeコールバック
    const drawRealTimeCallBack = {
        onReady: (tf) => {
            if (tf == true) {
                console.log("drawRealTime-リアルタイム描画が開始されました〇");
                changeStartCard(); //はじめましょうカードに移動関数呼ぶ
            }
            else {
                console.log("drawRealTime-リアルタイム描画が開始されませんでした×");
            }
        }
    };

    // Howto画面 - はじめましょう画面クリックで非表示して次へ
    const howToWindow = document.querySelector('#HowToWindow');

    const startCard = document.getElementById("StartCard");
    // はじめましょう画面がクリックされたら呼ぶ関数
    const clickedStartCard = () => {
        getArchive(CanvasRecMovie, getArchiveCallBack);
    };
    // Howto画面非表示関数(収録画面に遷移)
    const displayNoneStartCard =()=> {
        howToWindow.classList.add('Displaynone');
    };
    // はじめましょう画面クリックイベント
    startCard.addEventListener('click', clickedStartCard);
    // getArchiveコールバック
    const getArchiveCallBack = {
        getNum: (num) => {
            if (num <= 0) {
                console.log("getArchive-保存されているデータがありません");
                // Howto画面が表示されてたら非表示(最初のみ)
                if(howToWindow.classList.contains('Displaynone') == false){
                    displayNoneStartCard(); //Howto画面非表示関数
                }
            }
            else {
                console.log("getArchive-保存されているデータがあります");
                // 再生画面で戻るボタン押してgetArchive呼んだ際はこれ呼ぶ↓
                changeRecIcon(); // アイコン状態にする関数呼ぶ
                // 再生停止してアイコン画像欲しいからgetArchive呼んだ際はこれ呼ぶ↓
                stopRecFunc(); //UI周りを収録停止状態に変化させる
            }
        }
    };
}



// 再生画面 - 状態(見た目)切り替え関数 ---↓↓↓↓↓↓↓↓↓↓↓↓---------------------------------------------------------
const recContainer = document.getElementById('RecContainer');
// - 収録状態 (撮影ボタン押されたら)
function changeRecNow() {
    // 収録初めて
    if (recContainer.classList.contains('RecNow') == true) {
        return;
    }
    // 収録されたものがある状態なら
    else if (recContainer.classList.contains('RecIcon') == true) {
        recContainer.classList.remove('RecIcon');
    }
    // ゴミ箱が押されたら
    else if (recContainer.classList.contains('RecPlayer') == true) {
        recContainer.classList.remove('RecPlayer');
    }
    recContainer.classList.add('RecNow');
}
// - 収録終了状態 (完全白フェード時)
function changeRecFinish() {
    recContainer.classList.remove('RecNow');
    recContainer.classList.add('RecFinish');
    console.log('RecFinish切替');
}
// - アイコン状態 (白フェード終了時)
function changeRecIcon() {
    // 収録終了時
    if (recContainer.classList.contains('RecFinish') == true) {
        recContainer.classList.remove('RecFinish');
        //　戻るボタン押されたら 
    } else if (recContainer.classList.contains('RecPlayer') == true) {
        recContainer.classList.remove('RecPlayer');
    }
    recContainer.classList.add('RecIcon');
}
// - 再生状態 (アイコン押されたら)
function changeRecPlayer() {
    recContainer.classList.remove('RecIcon');
    recContainer.classList.add('RecPlayer');
}
// 再生画面 - 状態切り替え関数 ---↑↑↑↑↑↑↑↑↑↑↑↑-------------------------------------------------------------



// 〇〇〇〇収録画面 - 収録ボタン関連処理 ---↓↓↓↓↓↓↓↓↓↓↓↓----------------------------------------------------
let isRecPlay = false;
const buttonStartRec = document.getElementById('ButtonStartRec');
// ボタン押されたら呼ばれる関数
const recClick = () => {
    if (!isRecPlay) { //収録中でないなら
        console.log('スタート押された');
        initRec(initRecCallBack);
    } else { //収録中なら
        console.log('ストップ押された');
    }
}
buttonStartRec.addEventListener('click', recClick);
// initRecコールバック
const initRecCallBack = {
    onReady: (tf) => {
        if (tf == true) {
            console.log("initRec-初期化が完了しました〇");
            recording(recordingCallBack); //収録開始
        }
        else {
            console.log("initRec-初期化がに失敗しました×");
            stopRec(stopRecCallBack); //収録停止
        }
    }
};
// recordingコールバック
const recordingCallBack = {
    onReady: (tf) => {
        if (tf == true) {
            console.log("recording-収録が開始されました〇");
            startRecFunc(); //UI周りを収録中状態に変化させる
        }
        else {
            console.log("recording-収録が開始されませんでした×");
        }
    },
    onProcess: (recCount) => {
        // 時間をテキストに入れる関数
        const changeCountNum = () => {
            recCountText.textContent = recCount.toFixed(0);
        }
        // 10ミリ秒おきに繰り返す
        let countRecTime = setInterval(changeCountNum, 10);
        countRecTime; //カウントしなさい
        // 0未満なら
        if (recCount < 0) {
            console.log(" - 収録時間が0未満になりました");
            clearInterval(countRecTime); //カウントやめなさい
            recCountText.textContent = ''; //収録ボタンの数字を空に
            stopRec(stopRecCallBack); //収録停止
        }
    }
};
// stopRecコールバック
const stopRecCallBack = {
    onReady: (tf) => {
        if (tf == true) {
            console.log("stopRec-収録が停止されました〇");
            getArchive(getArchiveCallBack); //再生画面にサムネイル画像入れるため
        }
        else {
            console.log("stopRec-収録が停止できませんでした×");
        }
    }
};


// --- 収録ボタンのテキストに時間いれる[1]
const recCountText = document.getElementById('RecCountText');

// --- 収録ボタンの色変更関数[2]
const changeRecBtnColor =()=> {
    buttonStartRec.classList.toggle('NormalRecBtn');
    buttonStartRec.classList.toggle('StartRecBtn');
}

// ----- 収録開始ボタンがおされたら呼ぶ処理まとめた関数
function startRecFunc() {
    changeRecBtnColor(); //収録ボタン色オレンジに変更
    changeRecNow(); //再生画面を収録状態にする
    isRecPlay = true; //収録中フラグON
}

// ----- 収録停止ボタンがおされたor0秒になったら呼ぶ関数
let isWhiteOut = false;
const whiteFadePanelOver = document.getElementById('WhiteFadePanelOver');
// 初期化関数
const initFadeAnim = () => {
    if (whiteFadePanelOver.classList.contains('FadeInWhiteOverAnim') == true) {
        whiteFadePanelOver.classList.remove('FadeInWhiteOverAnim');
    }
}
// ----- 収録停止ボタンがおされたら呼ぶ処理まとめた関数
function stopRecFunc() {
    initFadeAnim(); // 初期化関数
    whiteFadePanelOver.classList.add('FadeOutWhiteOverAnim'); // フェードアウトAnimクラス足す
    isRecPlay = false; //収録中フラグOFF
}
// 各フェードアニメーション終わったら呼ばれる
whiteFadePanelOver.addEventListener('animationend', () => {
    if (!isWhiteOut) { //完全真っ白
        isWhiteOut = true;
        changeRecFinish(); // 再生画面を収録終了状態にする
        whiteFadePanelOver.classList.remove('FadeOutWhiteOverAnim'); // フェードアウトAnimクラス除去
        whiteFadePanelOver.classList.add('FadeInWhiteOverAnim'); // フェードインAnimクラス足す
    } else { //真っ白明けたら
        isWhiteOut = false;
        changeRecIcon(); // 再生画面をアイコン状態にする     
    }
});
// 再生画面がアイコン状態になるアニメ終わったら呼ばれる
recContainer.addEventListener('animationend', () => {
    if(recContainer.classList.contains('RecIcon') == true){
        // 画面操作を受け付けない処理を実装したらこのタイミングで解除
        changeRecBtnColor(); //収録ボタン色青に変更(おせるよーの見た目)
    }
});
// 〇〇〇〇収録画面 - 収録ボタン関連処理 ---↑↑↑↑↑↑↑↑↑↑↑↑-----------------------------------------------------



// 〇〇〇〇再生画面 - アイコン押して再生画面状態に -------------------------------------------
const CanvasRecMovie = document.getElementById('CanvasRecMovie');
let isClickBtnBackToRecWindow = false; //戻るボタン押されたフラグ　押されたらtrue,再生画面に遷移してきたときfalse
const changePlayerWindowFunc =()=> {
    changeRecPlayer(); //再生画面を再生状態に
    if(isClickBtnBackToRecWindow){
        isClickBtnBackToRecWindow = false;  //戻るボタンフラグ押されたOFF
    }
};
CanvasRecMovie.addEventListener('click', changePlayerWindowFunc);

isClickBtnBackToRecWindow = true; //戻るボタンフラグ押されたON

// 〇〇〇〇再生画面 - 戻るボタン押してアイコン状態に -------------------------------------------
// 戻るボタン押された関数
let isSaveDataPlay = false; //再生中フラグ
const btnBackToRecWindow = document.getElementById('ButtonBackToRecWindow');
const clickedBackToRecWindowBtn =()=> {
    isClickBtnBackToRecWindow = true; //戻るボタンフラグ押されたON
    if(!isSaveDataPlay){ //再生中でないなら
        getArchive(CanvasRecMovie, getArchiveCallBack); //アーカイブチェック
    }else{ //再生中なら
        stopPlaying(stopPlayingCallBack); //停止
    }
};
btnBackToRecWindow.addEventListener('click', clickedBackToRecWindowBtn);
// 〇〇〇〇再生画面 - 右下削除ボタン押してポップアップ表示・非表示 ------------------------------------------
const btnDeleteMovie = document.getElementById('ButtonDeleteMovie');
const deleteConfirmText = document.getElementById('DeleteConfirmText');
// --- 確認ポップアップウインドウ表示・非表示
const toggleDeleteConfirm =()=> {
    deleteConfirmText.classList.toggle('InactivePopupWindow');
    deleteConfirmText.classList.toggle('ActivePopupWindow');
}
btnDeleteMovie.addEventListener('click', toggleDeleteConfirm);
// --- キャンセル押したら非表示
const cancelText = document.getElementById('CancelText');
cancelText.addEventListener('click', toggleDeleteConfirm);
// --- 削除押したら再生画面を収録状態にする
const deleteText = document.getElementById('DeleteText');
deleteText.addEventListener('click', changeRecNow);
deleteText.addEventListener('click', toggleDeleteConfirm);


// 〇〇〇〇再生画面 - 再生/停止ボタン押してアイコン切替 -------------------------------------------
const btnStartPlay = document.getElementById('ButtonStartPlay');
const changeMovieBtnIcon =()=> {
    btnStartPlay.classList.toggle('PlayMovieBtn');
    btnStartPlay.classList.toggle('StopMovieBtn');
};

const clickedPlayStopBtn =()=> {
    if(!isSaveDataPlay){ //再生中でないなら
        play(CanvasRecMovie, playCallBack); //再生
    }else{ //再生中なら
        stopPlaying(stopPlayingCallBack); //停止
    }
};
btnStartPlay.addEventListener('click', clickedPlayStopBtn);
// playコールバック
const playCallBack = {
    onReady: (tf) => {
        if (tf == true) {
            console.log("play-再生が開始されました〇");
            changeMovieBtnIcon(); //アイコン切替関数
            isSaveDataPlay = true; //再生中フラグON
        }
        else {
            console.log("play-再生が開始できませんでした×");
        }
    }
};
// stopPlayingコールバック
const stopPlayingCallBack = {
    onReady: (tf) => {
        if (tf == true) {
            console.log("stopPlaying-再生が停止されました〇");
            changeMovieBtnIcon(); //アイコン切替関数
            isSaveDataPlay = false; //再生中フラグOFF
            // もし戻るボタンが押されていたらgetArchive呼ぶ
            if(isClickBtnBackToRecWindow == true){
                getArchive(CanvasRecMovie, getArchiveCallBack); //アーカイブチェック
            }
        }
        else {
            console.log("stopPlaying-再生が停止できませんでした×");
        }
    }
};






// テスト用
document.addEventListener('keypress', keypress_ivent);
// const recContainer = document.getElementById('RecContainer');
function keypress_ivent(e) {
    if (e.key === 'a' || e.key === 'A') {
        //Aキーが押された時の処理 //収録終了
        recContainer.classList.remove('RecFinish');
        recContainer.classList.add('RecIcon');
    }
    if (e.key === 'b' || e.key === 'B') {
        //Bキーが押された時の処理 //左下アイコンタップ
        openPlayWindow();
    }
    if (e.key === 'c' || e.key === 'C') {
        //Cキーが押された時の処理 //×アイコンタップ
        recContainer.classList.remove('RecPlayer');
        recContainer.classList.add('RecIcon');
    }
    if (e.key === 'd' || e.key === 'D') {
        console.log(isRecPlay);
    }
    return false;
}



