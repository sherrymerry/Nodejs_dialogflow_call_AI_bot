// const axios = require('axios');
// const fs = require('fs');

// async function convertAudioToText(audioFilePath) {
//     const whisperApiUrl = 'https://api.whisper.ai/speech-to-text';
//     const apiKey = 'YOUR_WHISPER_API_KEY';
    
//     const response = await axios.post(whisperApiUrl, fs.createReadStream(audioFilePath), {
//         headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'audio/mpeg'
//         }
//     });

//     return response.data.text;
// }


// convertAudioToText('WhatsApp Ptt 2024-06-04 at 3.31.35 AM.ogg').then(text => {
//     console.log('Transcription:', text);
// });


// import fs from "fs";
// import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//     const translation = await openai.audio.translations.create({
//         file: fs.createReadStream("/assets/audios/WhatsApp Ptt 2024-06-04 at 3.31.35 AM.ogg/french.mp3"),
//         model: "whisper-1",
//     });

//     console.log(translation.text);
// }
// main();


const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function transcribeAudio(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    // Add language parameter if Whisper API supports it, assuming 'language' is the parameter name
    form.append('language', 'fr');

    try {
        const response = await axios.post('YOUR_WHISPER_API_URL', form, {
            headers: form.getHeaders()
        });
        return response.data; // This should contain the transcribed text in French
    } catch (error) {
        console.error('Error transcribing audio:', error);
        throw error;
    }
}

// Example usage
transcribeAudio('assets/audios/synthesis.mp3').then(transcription => {
    console.log('Transcription:', transcription);
}).catch(error => {
    console.error('Transcription failed:', error);
});
