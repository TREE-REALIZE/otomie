'use strict';
// let isdelete = false;
// console.log(isdelete);
// const call = (tf) => {
//     isdelete = tf;
//     console.log("tf:  " + tf);

//     if (isdelete == true) {
//         changeScreen();
//     } else {
//         alert("isdelete = false");
//     }
// }

// Delete(call);

// const changeScreen = () => {
//     //UI切り替え処理。。。
// }

// console.log(isdelete);

// スプラッシュ画面
{
    // スプラッシュ画面 - アニメ終わりで非表示して次へ
    const appLogoGrp = document.querySelector('.FadeOutAppLogo');
    const splashWindow = document.querySelector('#SplashWindow');
    
    appLogoGrp.addEventListener('animationend', function () {
        splashWindow.classList.add('Displaynone');
    });
}

// Howto画面
{
    // Howto画面 - 画面クリックでスライド
    const conceptCard = document.querySelector('#ConceptCard');
    const micOnCard = document.querySelector('#MicOnCard');
    const startCard = document.querySelector('#StartCard');
    const sliderContent = document.querySelectorAll('.SliderContent');
    
    document.getElementById("ConceptCard").onclick = function () {
        sliderContent[0].classList.add('SlideHowtoAnim01');
        sliderContent[1].classList.add('SlideHowtoAnim01');
        sliderContent[2].classList.add('SlideHowtoAnim01');
    };
    document.getElementById("MicOnCard").onclick = function () {
        sliderContent[0].classList.add('SlideHowtoAnim02');
        sliderContent[1].classList.add('SlideHowtoAnim02');
        sliderContent[2].classList.add('SlideHowtoAnim02');
    };
    
    // Howto画面 - 画面クリックで非表示して次へ
    const howToWindow = document.querySelector('#HowToWindow');
    
    document.getElementById("StartCard").onclick = function () {
        howToWindow.classList.add('Displaynone');
    };
}

// 再生画面 - 状態(見た目)切り替え関数 ---↓↓↓↓↓↓↓↓↓↓↓↓-----------------------------------------------------------------
const recContainer = document.getElementById('RecContainer');
// - 収録状態 (撮影ボタン押されたら)
function changeRecNow(){
    // 収録初めて
    if(recContainer.classList.contains('RecNow') == true){
        return;
    }
    // 収録されたものがある状態なら
    else if(recContainer.classList.contains('RecIcon') == true){
        recContainer.classList.remove('RecIcon');
    }
    // ゴミ箱が押されたら
    else if(recContainer.classList.contains('RecPlayer') == true){
        recContainer.classList.remove('RecPlayer');
    }
    recContainer.classList.add('RecNow');
}
// - 収録終了状態 (完全白フェード時)
function changeRecFinish() {
    recContainer.classList.remove('RecNow');
    recContainer.classList.add('RecFinish');
}
// - アイコン状態 (白フェード終了時)
function changeRecIcon() {
    // 収録終了時
    if(recContainer.classList.contains('RecFinish') == true){
        recContainer.classList.remove('RecFinish');
    //　戻るボタン押されたら 
    }else if(recContainer.classList.contains('RecPlayer') == true){
        recContainer.classList.remove('RecPlayer');
    }
    recContainer.classList.add('RecIcon');
}
// - 再生状態 (アイコン押されたら)
function changeRecPlayer() {
    recContainer.classList.remove('RecIcon');
    recContainer.classList.add('RecPlayer');
}
// 再生画面 - 状態切り替え関数 ---↑↑↑↑↑↑↑↑↑↑↑↑-----------------------------------------------------------------



// 〇〇〇〇収録画面 - 収録ボタン関連処理 ---↓↓↓↓↓↓↓↓↓↓↓↓--------------------------------------------------------------
const buttonStartRec = document.getElementById('ButtonStartRec');
buttonStartRec.addEventListener('click', recClick);
// ボタン押されたら呼ばれる関数
function recClick(isPlay) {
    if(!isPlay){ //収録中でないなら
        startRec();
    }else{ //収録中なら
        stopRec();
    }
}

// --- 収録ボタンのテキストに時間いれる[1]
const recCountText = document.getElementById('RecCountText');
// 収録時間
let countNum;
// 時間をテキストに入れる関数
function changeCountNum() {
    recCountText.textContent = countNum.toFixed(0);
}

// --- 収録ボタンの色変更関数[2]
function changeRecBtnColor() {
    buttonStartRec.classList.toggle('NormalRecBtn');
    buttonStartRec.classList.toggle('StartRecBtn');
}

// ----- 収録開始ボタンがおされたら呼ぶ関数
function startRec(){
    changeRecBtnColor(); //収録ボタン色オレンジに変更
    changeRecNow(); //再生画面を収録状態にする
}

// ----- 収録停止ボタンがおされたor0秒になったら呼ぶ関数
const whiteFadePanelOver = document.getElementById('WhiteFadePanelOver');
function stopRec() {
    changeRecBtnColor(); //収録ボタン色青に変更
    // 2回目以降フェードインクラス削除
    if(whiteFadePanelOver.classList.contains('FadeInWhiteInAnim') == true){
        whiteFadePanelOver.classList.remove('FadeInWhiteInAnim');
    }
    // フェードアウトアニメ開始
    whiteFadePanelOver.classList.add('FadeOutWhiteOverAnim'); 
}
// フェードアウトアニメ終了したら
whiteFadePanelOver.addEventListener('animationend', function () {
    if (whiteFadePanelOver.classList.contains('FadeOutWhiteOverAnim') == true) {
        changeRecFinish(); // 再生画面を収録終了状態にする
        whiteFadePanelOver.classList.remove('FadeOutWhiteOverAnim');
        whiteFadePanelOver.classList.add('FadeInWhiteOverAnim'); // 白フェードインさせる
    }
});
// フェードインアニメ終了したら
whiteFadePanelOver.addEventListener('animationend', function () {
    if (whiteFadePanelOver.classList.contains('FadeInWhiteOverAnim') == true) {
        changeRecIcon(); // 再生画面をアイコン状態にする
    }
});
// 〇〇〇〇収録画面 - 収録ボタン関連処理 ---↑↑↑↑↑↑↑↑↑↑↑↑------------------------------------------------------------


// 〇〇〇〇再生画面 - アイコン押して再生画面状態に -------------------------------------------
const btnCanvasRecMovie = document.getElementById('CanvasRecMovie');
btnCanvasRecMovie.addEventListener('click', changeRecPlayer);
// 〇〇〇〇再生画面 - 戻るボタン押してアイコン状態に -------------------------------------------
const btnBackToRecWindow = document.getElementById('ButtonBackToRecWindow');
btnBackToRecWindow.addEventListener('click', changeRecIcon);
// 〇〇〇〇再生画面 - 右下削除ボタン押してポップアップ表示・非表示 -------------------------------------------
const btnDeleteMovie = document.getElementById('ButtonDeleteMovie');
const deleteConfirmText = document.getElementById('DeleteConfirmText');
btnDeleteMovie.addEventListener('click', toggleDeleteConfirm);
// --- 確認ポップアップウインドウ表示・非表示
function toggleDeleteConfirm(){
    deleteConfirmText.classList.toggle('InactivePopupWindow');
    deleteConfirmText.classList.toggle('ActivePopupWindow');
}
// --- キャンセル押したら非表示
const cancelText = document.getElementById('CancelText');
cancelText.addEventListener('click', toggleDeleteConfirm);
// --- 削除押したら再生画面を収録状態にする
const deleteText = document.getElementById('DeleteText');
deleteText.addEventListener('click', changeRecNow);
deleteText.addEventListener('click', toggleDeleteConfirm);


// 〇〇〇〇再生画面 - 再生/停止ボタン押してアイコン切替 -------------------------------------------
const btnStartPlay = document.getElementById('ButtonStartPlay');
btnStartPlay.addEventListener('click', changeMovieBtnIcon);
function changeMovieBtnIcon(){
    btnStartPlay.classList.toggle('PlayMovieBtn');
    btnStartPlay.classList.toggle('StopMovieBtn');
}







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
    }
    return false;
}



