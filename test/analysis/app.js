/**
□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
◆UIManagere.js

const onReady = (tf) => {
    console.log("onReady");
    if (tf == true) {
        console.log("minOn success");
    }
    else {
        console.log("micOn not sucessed");
    }
}

const micOnTouched = () => {
    micOn({onReady});
}
□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
 */

import * as funcs from './voice_analyse.js';

window.addEventListener("load", () => {
    funcs.getCanvases();
    document.querySelector("#TitleWindow").addEventListener("click", micOn);
    document.querySelector("#drawRealTime").addEventListener("click", drawRealTime);
    document.querySelector("#getArchive").addEventListener("click", getArchive);
    //document.querySelector("#ButtonOpenMovie").addEventListener("click", playDataList);

    console.log("load finish");
});

//◆ app.js
const micOn = ({
    onReady = () => { },
    onComplete = () => { }
} = {}) => {

    //マイクをONにする処理
    funcs.startCollecting();

    if (onReady && typeof onReady === "function") {
        console.log("onReady && typeof onReady ");
        onReady(true);
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}

// drawRealTime(_canvas, { onReady, onProcess, onComplete });
// play(_canvas, { onReady, onProcess, onComplete });

const drawRealTime = (_canvas, {
    onReady = () => { },
    onProcess = () => { },
    onComplete = () => { },
} = {}) => {

    //リアルタイム描画する処理
    // ・
    // ・
    // ・
    funcs.switchRealTime();
    console.log("drawRealTime:   " + funcs.drawRealTime);

    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onProcess && typeof onProcess === "function") {
        onProcess(true);
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}

const getArchive = ({
    onReady = () => { },
    getNum = () => { },
    getImage = () => { },
    onComplete = () => { },
} = {}) => {

    //収録データを取得する処理
    // ・
    // ・
    // ・
    console.log("getArchive");
    funcs.getPlayingData;
    let numImage = funcs.getPlayingData.numData;
    console.log("funcs.getPlayingData.numData:  " + funcs.getPlayingData.numData);



    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onReady && typeof onReady === "function") {
        getNum(numImage);
    }
    if (onComplete && typeof onComplete === "function") {
        getImage("imageFile");
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}

const initRec = ({
    onReady = () => { },
    onComplete = () => { },
} = {}) => {

    //収録データを取得する処理
    // ・
    // ・
    // ・
    console.log("initRec");

    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}

const recording = ({
    onReady = () => { },
    onProcess = () => { },
    onComplete = () => { },
} = {}) => {
    //収録データを取得する処理
    // ・
    // ・
    // ・    
    console.log("recording");
    let recordingTime = 0;

    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onProcess && typeof onProcess === "function") {
        onProcess(recordingTime);
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}

const stopRec = ({
    onReady = () => { },
    onComplete = () => { },
}) => {

    //収録停止する処理
    // ・
    // ・
    // ・
    console.log("stopRec");

    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }

}

const play = ({
    onReady = () => { },
    onProcess = () => { },
    onComplete = () => { },
}) => {

    //再生する処理
    // ・
    // ・
    // ・
    console.log("play");
    if (onReady && typeof onReady === "function") {
        onReady(true);
    }
    if (onProcess && typeof onProcess === "function") {
        onProcess(true);
    }

    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }

}


const stopPlay = ({
    onReady = () => { },
    onComplete = () => { },
}) => {
    //再生停止する処理
    // ・
    // ・
    // ・

    console.log("stopPlay");
    if (onReady && typeof onReady === "function") {
        onReady(true);
    }

    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }
}


const deleteData = ({
    onReady = () => { },
    onComplete = () => { },
}) => {

    //収録データを削除する処理
    // ・
    // ・
    // ・

    console.log("deleteData");
    if (onReady && typeof onReady === "function") {
        onReady(true);
    }

    if (onComplete && typeof onComplete === "function") {
        onComplete(true);
    }

}