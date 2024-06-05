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


import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const translation = await openai.audio.translations.create({
        file: fs.createReadStream("/path/to/file/german.mp3"),
        model: "whisper-1",
    });

    console.log(translation.text);
}
main();