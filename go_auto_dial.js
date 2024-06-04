const axios = require('axios');

async function initiateCall(phoneNumber, agentId) {
    const goautodialApiUrl = 'https://YOUR_GOAUTODIAL_API_URL/calls';
    const apiKey = 'YOUR_GOAUTODIAL_API_KEY';
    
    const payload = {
        phone_number: phoneNumber,
        agent_id: agentId,
        campaign_id: 'YOUR_CAMPAIGN_ID'
    };
    
    const response = await axios.post(goautodialApiUrl, payload, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

// Example usage
initiateCall('1234567890', 'AGENT_ID').then(response => {
    console.log('Call initiated:', response);
});
