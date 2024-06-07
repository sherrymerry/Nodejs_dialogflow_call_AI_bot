require('dotenv').config();

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const whisperApiUrl = process.env.WHISPER_API_URL;

async function transcribeAudio(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('language', 'fr'); // Assuming Whisper API supports language parameter

    try {
        const response = await axios.post(whisperApiUrl, form, {
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

module.exports = { transcribeAudio };
