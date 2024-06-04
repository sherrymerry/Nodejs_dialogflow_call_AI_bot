const axios = require('axios');
const fs = require('fs');

async function convertAudioToText(audioFilePath) {
    const whisperApiUrl = 'https://api.whisper.ai/speech-to-text';
    const apiKey = 'YOUR_WHISPER_API_KEY';
    
    const response = await axios.post(whisperApiUrl, fs.createReadStream(audioFilePath), {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'audio/mpeg'
        }
    });

    return response.data.text;
}

// Example usage
convertAudioToText('WhatsApp Ptt 2024-06-04 at 3.31.35 AM.ogg').then(text => {
    console.log('Transcription:', text);
});
