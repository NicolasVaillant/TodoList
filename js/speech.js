// JS FILE

const speech = document.querySelector('.speech');
const fa_microphone = document.querySelector('.fa-microphone');

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
// const textbox = input
let content_speech = '';
recognition.continuous = true;

// recognition.onstart = function() {instructions.text("Voice Recognition is On")}
//
// recognition.onspeechend = function() {instructions.text("No Activity")}

// recognition.onerror = function() {instructions.text("Try Again")}

recognition.onresult = function(event) {
    let current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content_speech += transcript;

    input.value = content_speech;
}

let click = 0;

speech.onclick = speechF;

function speechF(){
    click++;

    if(click % 2 === 0){
        recognition.abort();
        speech.style.animation = "none";
        click = 0;
        // M.toast({html: "Fin de l'enregistrement"})
    }else{
        recognition.start();
        speech.style.animation = "pulse 2s infinite";
        // M.toast({html: 'Enregistrement'})
    }
}
