const synth = window.speechSynthesis;

async function processSpokenCommand(command, shouldAddressAsBoss = false) {
    const responses = document.getElementById("responses");

    const response = await fetch("/respond", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: command, boss: shouldAddressAsBoss})
    }).then(res => res.json());

    const responseElement = document.createElement("p");
    responseElement.innerText = response.response_text;
    responses.appendChild(responseElement);
    responses.scrollTop = responses.scrollHeight;

    // Play the audio response
    const utterance = new SpeechSynthesisUtterance(response.response_text);
    utterance.lang = 'en-US';
    utterance.volume = parseFloat(document.getElementById("volume-slider").value);
    synth.speak(utterance);
}

document.getElementById("mic-btn").addEventListener("click", () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        processSpokenCommand(command, true);
    };
    recognition.start();
});