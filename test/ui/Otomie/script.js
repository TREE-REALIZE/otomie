'use strict';

// スプラッシュ画面 - アニメ終わりで非表示して次へ
const appLogoGrp = document.querySelector('.FadeOutAppLogo');
const splashWindow = document.querySelector('#SplashWindow');

appLogoGrp.addEventListener('animationend', function() {
    splashWindow.classList.add('Displaynone');
});

// Howto画面 - 画面クリックでスライド
const conceptCard = document.querySelector('#ConceptCard');
const micOnCard = document.querySelector('#MicOnCard');
const startCard = document.querySelector('#StartCard');
const sliderContent = document.querySelectorAll('.SliderContent');

document.getElementById("ConceptCard").onclick = function() {
    sliderContent[0].classList.add('SlideHowtoAnim01');
    sliderContent[1].classList.add('SlideHowtoAnim01');
    sliderContent[2].classList.add('SlideHowtoAnim01');
};
document.getElementById("MicOnCard").onclick = function() {
    sliderContent[0].classList.add('SlideHowtoAnim02');
    sliderContent[1].classList.add('SlideHowtoAnim02');
    sliderContent[2].classList.add('SlideHowtoAnim02');
};

// Howto画面 - 画面クリックで非表示して次へ
const howToWindow = document.querySelector('#HowToWindow');

document.getElementById("StartCard").onclick = function() {
    howToWindow.classList.add('Displaynone');
};

// 収録準備画面 - 画面クリックで録画ボタン引っ込むor現れる
const buttonStartRec = document.querySelector('#ButtonStartRec');

document.getElementById("RecWindow").onclick = function() {
    if(buttonStartRec.classList.contains('DownRecBtnAnim') == false){ //初回引っ込み
        buttonStartRec.classList.add('DownRecBtnAnim');
        if(buttonStartRec.classList.contains('UpRecBtnAnim') == true){ //2回目以降引っ込み
            buttonStartRec.classList.remove('UpRecBtnAnim');
            buttonStartRec.classList.add('DownRecBtnAnim');
        }
    }else{ //現れる
        buttonStartRec.classList.remove('DownRecBtnAnim');
        buttonStartRec.classList.add('UpRecBtnAnim');
    }
};

// 収録準備画面 - 録画ボタンクリックで収録開始
document.getElementById("ButtonStartRec").onclick = function(event) {
    alert('録画開始');
    event.stopPropagation(); //RecWindowのonclick抑止
};
// 停止ボタンに見た目変化
// メーター動かす