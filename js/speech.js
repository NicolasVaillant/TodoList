// JS FILE

const speech = document.querySelector('.speechTodo');
const speechTodo = document.querySelector('.speechTodo');
const speechNote = document.querySelector('.speechNote');
const searchBar__todo = document.querySelector('#searchBar--todo');

const speechRecognition = window.webkitSpeechRecognition || SpeechRecognition;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    console.info("SpeechRecognition supported");

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

        searchBar__todo.value = content_speech;
    }

    let click = 0;

    speech.onclick = speechF;

    function speechF(){
        click++;

        if(click % 2 === 0){
            recognition.abort();
            speech.classList.remove('speechOn');
            click = 0;
            notifyMe("Fin de l'enregistrement.")
        }else{
            recognition.start();
            speech.classList.add('speechOn');
            notifyMe("Enregistrement en cours...")
        }
    }

    function notifyMe(value) {
        const options = {
            body: "Utilisation du micro sur todo.nicolasvaillant.net",
            badge: "/ressources/favicon/check_64.png"
        };
        if (!('Notification' in window)) {
            alert('Ce navigateur ne prend pas en charge la notification de bureau')
        }else if (Notification.permission === 'granted') {
            const notification = new Notification(value, options);
        }else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    const notification = new Notification(value, options);
                }
            })
        }
    }

} else {
    console.warn("SpeechRecognition not supported");

    speechTodo.classList.add('speech_not_supported');
    speechNote.classList.add('speech_not_supported');
}