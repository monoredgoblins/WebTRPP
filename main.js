const AUDIO_ELEM = document.getElementById("audio");
const INPUT_AUDIO_ELEM = document.getElementById("inputAudio");
const OFFSET_ELEM = document.getElementById("offset");
const INPUT_FILE_ELEM = document.getElementById("inputFile");

let gDevice;
let gPattern;
let gNowCount = 0;
let gOffset = 0.5;
let gPreviousTime = 0;

function audioInput() {
    const files = INPUT_AUDIO_ELEM.files;
    if (files ?? false)
        if (files[0].type.startsWith("audio/"))
            AUDIO_ELEM.src = URL.createObjectURL(files[0]);
        else INPUT_AUDIO_ELEM.value = null;
}

function fileInput() {
    const files = INPUT_FILE_ELEM.files;
    if (!(files ?? false)) return;
    if (!files[0].type.startsWith("text/")) {
        INPUT_FILE_ELEM.value = null;
        return;
    }

    const fReader = new FileReader();
    fReader.onload = (event) => {
        const pattern = loadPattern(event.target.result);
        gPattern = pattern;
    };

    // ファイル内容読み込み実施
    fReader.readAsText(files[0]);
}

function loadTestPattern() {
    INPUT_AUDIO_ELEM.value = null;
    INPUT_FILE_ELEM.value = null;
    AUDIO_ELEM.src = "testaudio.mp3";
    gPattern = gTestPattern;
}

function offsetChanged() {
    const r = OFFSET_ELEM.value.match(/^[\-\+]?[0-9]*(\.[0-9]+)?$/);
    if (r === null) gOffset = 0;
    else gOffset = Number(r[0]);

    console.log("offset: " + gOffset);
}

function audioOnSeeked() {
    console.log("audioOnSeeked called.");
    if (gPattern ?? false) gNowCountValidate();
}

function audioStopped() {
    if (gDevice) gDevice.vibrate(0);
}

function togglePopup() {
    const elem = document.getElementById("popup");
    elem.classList.toggle("is-show");
}

function main() {
    loadTestPattern();
}

main();