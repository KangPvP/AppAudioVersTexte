document.getElementById('sendBtn').addEventListener('click', async () => {
    const inputElement = document.getElementById('audioInput');
    const apiKey = 'AIzaSyDvhEEI4Nb7yo1b1RRwitaU9Y7JpgguTUY'; 

    if (inputElement.files.length === 0) return;
    const file = inputElement.files[0];

    // 1. Détection de l'encodage via binaire (Magic Numbers)
    const detectedEncoding = await detectEncodingByHeader(file);
    
    // 2. Détection du sample rate (si possible)
    // On met une valeur par défaut (16000) pour satisfaire le validateur
    // car on sait que pour MP3/WAV, Google lira la vraie valeur dans le fichier.
    const detectedSampleRate = await getSampleRate(file) || 16000;

    console.log(`Configuration : ${detectedEncoding} @ ${detectedSampleRate}Hz`);

    const base64Audio = await toBase64(file);

    const payload = {
        config: {
            encoding: detectedEncoding,
            sampleRateHertz: detectedSampleRate, 
            languageCode: "fr-FR",
            enableAutomaticPunctuation: true
        },
        audio: {
            content: base64Audio
        }
    };

    try {
        // 3. La requête Fetch
        const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Google veut du JSON
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // 4. Afficher le résultat
        if (data.error) {
            console.error("Erreur Google:", data.error);
            alert("Erreur: " + data.error.message);
        } else if (data.results) {
            // Google renvoie souvent plusieurs morceaux, on prend le premier
            const transcript = data.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            
            console.log("Texte :", transcript);
            document.getElementById('result').textContent = transcript;
        } else {
            console.log("Aucun texte détecté.");
        }

    } catch (error) {
        console.error("Erreur réseau :", error);
    }
});

// --- Fonction Utilitaire pour convertir le fichier en Base64 propre ---
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Le résultat ressemble à "data:audio/mp3;base64,SUQzBAAAAA...", 
            // Google veut juste la partie après la virgule.
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}