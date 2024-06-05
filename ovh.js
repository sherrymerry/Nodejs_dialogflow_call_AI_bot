const ovh = require('ovh')({
    endpoint: 'ovh-eu', // or 'ovh-us'
    appKey: 'YOUR_APP_KEY',
    appSecret: 'YOUR_APP_SECRET',
    consumerKey: 'YOUR_CONSUMER_KEY'
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
