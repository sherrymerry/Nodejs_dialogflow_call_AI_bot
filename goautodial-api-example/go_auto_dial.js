const axios = require('axios');
const goautodial = require('./go_auto_dial.js'); 

// Replace with your GoAutoDial API credentials and endpoint
const goautodialApiUrl = 'https://your-goautodial-server/api/v2'; // Replace 'your-goautodial-server' with your actual server URL
const apiKey = 'YOUR_GOAUTODIAL_API_KEY'; // Replace 'YOUR_GOAUTODIAL_API_KEY' with your actual API key
const campaignId = 'YOUR_CAMPAIGN_ID'; // Replace 'YOUR_CAMPAIGN_ID' with your actual campaign ID

async function initiateCall(phoneNumber, agentId) {
    const payload = {
        phone_number: phoneNumber,
        agent_id: agentId,
        campaign_id: campaignId // Use the actual campaign ID here
    };

    try {
        const response = await axios.post(`${goautodialApiUrl}/calls`, payload, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Call initiated:', response.data);
    } catch (error) {
        console.error('Error initiating call:', error.response ? error.response.data : error.message);
    }
}

// Example usage
initiateCall('1234567890', 'AGENT_ID'); // Replace '1234567890' with an actual phone number and 'AGENT_ID' with an actual agent ID
