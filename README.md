# otomie<br>
音を可視化し，難聴者と健聴者の垣根をなくすことを目的としたアプリケーション．



## 想定デバイス
iphone12 Pro Max <br>
- iOS 15<br>
- 2,778 x 1,284ピクセル解像度<br> 

- スペック参照<br>
https://www.apple.com/jp/iphone/compare/?modelList=iphone12promax,iphone12pro,iphone12mini<br>

- デバイス解像度はレティナディスプレイのため3倍．<br>



## フォルダ構成
```bash
  -app          ：本番用
    index.html
    -styles
    -images
    -script
    
  -test         ：テスト用
    -sample     ：データをループ再生するサンプルアプリ 
    -analysis   ：音声解析処理作業用
    -graphics   ：グラフィック描画処理作業用
    -ui         ：UI作業用
```

## グラフィック描画について
サイズ： 1024ｘ1024  ピクセル

## サンプルアプリについて
アプリ全体の構成が決定するまで，グラフィックを作業を進めていただくためのアプリ．<br>
graphicsフォルダで描画処理作業を進める．


#### 使い方
1.  test/graphics/sample/index.html をブラウザで開く．
2. 「再生」ボタン押下で読み込んでいるJsonファイルのグラフィックが描画される．<br>
     デフォルトでは./soundData.jsを読み込んでる．
3. 「ファイルを選択」ボタンを押下で別のJsonファイルを読み込める．





 
## 音データの形式
 
【音データの形式】
```bash
_data = {
    time: "20220124195600",         //(String)              収録を開始した時間
    samplingRate: 48000,            //(int)                 サンプリングレート
    fsDivN: 0,                      //(float)               周波数分解能
    dataList: [                     //(オブジェクトの配列)    配列の要素一つを1フレームの描画に使用する．  
        {
            deltaTime: 0,           //(float)               
            raw: {                                          
                PCM: [],            //(floatの配列)         音の生データ
                frequency: [],      //(Uintの配列)          周波数データ
                timeDomain: [],     //(Uintの配列)          波形データ
                volume: 0.0,        //(float)               音量
                pitch: 0.0,         //(float)               高さ
                sharpness: 0.0,     //(float)               シャープネス
                roughness: 0.0,     //(float)               ラフネス
            },
            visual: {               //ビジュアル用に正規化
                volume: 0.0,        //(float)【0－1】       音量 
                pitch: 0.0,         //(float)【0－1】       高さ   
                sharpness: 0.0,     //(float)【0－1】       シャープネス
                roughness: 0.0,     //(float)【0－1】       ラフネス
     
            }
        }
    ],//rawDataList
}
```
