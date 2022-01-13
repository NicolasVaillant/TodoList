// JS FILE

const speech = document.querySelector('.speechTodo');
const fa_microphone = document.querySelector('.fa-microphone');

const speechRecognition = window.webkitSpeechRecognition || SpeechRecognition;
const recognition = new speechRecognition();
recognition.lang = 'fr-FR';
let content_speech = '';
recognition.continuous = true;

recognition.onresult = function(event) {
    let current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content_speech += transcript;

    // console.log(transcript)

    // if(content_speech === "entrée" || content_speech === "entrer"){
    //     console.log("ok")
    // }

    input.value = content_speech;
}

let click = 0;

speech.onclick = speechF;

function speechF(){
    click++;

    if(click % 2 === 0){
        recognition.abort();
        speech.classList.remove('speechOn');
        click = 0;
        // M.toast({html: "Fin de l'enregistrement"})
    }else{
        recognition.start();
        speech.classList.add('speechOn');
        // M.toast({html: 'Enregistrement'})
    }
}
