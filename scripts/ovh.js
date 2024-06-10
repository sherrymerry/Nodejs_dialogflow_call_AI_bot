require('dotenv').config();

const ovh = require('ovh')({
    endpoint: 'ovh-eu', // or 'ovh-us'
    appKey: process.env.OVH_APP_KEY,
    appSecret: process.env.OVH_APP_SECRET,
    consumerKey: process.env.OVH_CONSUMER_KEY
});

async function uploadToOVH(localFilePath, ovhFilePath) {
    const fs = require('fs');
    const stream = fs.createReadStream(localFilePath);

    return new Promise((resolve, reject) => {
        ovh.request('POST', `/me/document`, {
            file: stream,
            name: ovhFilePath
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

async function downloadFromOVH(ovhFilePath, localFilePath) {
    const fs = require('fs');
    const stream = fs.createWriteStream(localFilePath);

    return new Promise((resolve, reject) => {
        ovh.request('GET', `/me/document/${ovhFilePath}`, (err, result) => {
            if (err) reject(err);
            else {
                result.pipe(stream);
                stream.on('finish', resolve);
                stream.on('error', reject);
            }
        });
    });
}

uploadToOVH('assets/audios/synthesis.mp3', 'remote/synthesis.mp3').then(response => {
    console.log('File uploaded:', response);
}).catch(error => {
    console.error('File upload failed:', error);
});

downloadFromOVH('remote/synthesis.mp3', 'assets/audios/downloaded_synthesis.mp3').then(() => {
    console.log('File downloaded successfully');
}).catch(error => {
    console.error('File download failed:', error);
});

module.exports = { uploadToOVH, downloadFromOVH };
