// const dialogflow = require('@google-cloud/dialogflow');
// const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 8080;

// app.post("/webhook", async (req, res) => {
//     console.log('Received a request at /webhook');
//     console.log('Request body:', req.body);

//     try {
//         var id = (res.req.body.session).substr(43);
//         console.log('Session ID:', id);   

//         const agent = new WebhookClient({ request: req, response: res });

//         function hi(agent) {
//             console.log('Default Welcome Intent => hi');
//             agent.add("Hi there! Ready to book your table? Let's get started");
//         }

//         function fallback(agent) {
//             console.log('Default Fallback Intent => fallback');
//             agent.add("I didn't understand that. Can you try again?");
//         }

//         function menu(agent) {
//             console.log('menu => menu');
//             agent.add("Sure! We offer a variety of delicious options, including appetizers, salads, entrees, and desserts. You'll find something to love, whether you prefer seafood, steaks, vegetarian dishes, or classic comfort food. How can I assist you further with your reservation?");
//         }

//         function order(agent) {
//             console.log('order => order');
//             agent.add("Sure! For appetizers and salads, the total cost will be $80. How would you like to proceed with your order?");
//         }

//         function pricing(agent) {
//             console.log('pricing => pricing');
//             agent.add("Great! We accept online payments and credit cards");
//         }

//         function confirmation(agent) {
//             console.log('confirmation => confirmation');
//             agent.add("Thank you for the transfer! Let me confirm the payment on our end. Thank you for your confirmation! Have a nice day!");
//         }

//         function sendNotes(agent) {
//             const { number, date, email } = agent.parameters;
//             console.log(`sendNotes => number: ${number}, date: ${date}, email: ${email}`);
//             agent.add("Your note has been sent!");
//         }

//         let intentMap = new Map();
//         intentMap.set('Default Welcome Intent', hi); 
//         intentMap.set('Default Fallback Intent', fallback);
//         intentMap.set('menu', menu);
//         intentMap.set('order', order);
//         intentMap.set('pricing', pricing);
//         intentMap.set('confirmation', confirmation);
//         intentMap.set('sendNotes', sendNotes);
        
//         agent.handleRequest(intentMap);
//     } catch (error) {
//         console.error('Error handling the request:', error);
//         res.status(500).send('An error occurred while processing your request.');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
require('dotenv').config();

const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');
const { transcribeAudio } = require('./scripts/transcription');
const { initiateCall } = require('./scripts/goautodial');
const { uploadToOVH, downloadFromOVH } = require('./scripts/ovh');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.post('/webhook', async (req, res) => {
    console.log('Received a request at /webhook');
    console.log('Request body:', req.body);

    try {
        const agent = new WebhookClient({ request: req, response: res });

        function welcome(agent) {
            agent.add('Bonjour! Comment puis-je vous aider aujourd\'hui?');
        }

        function fallback(agent) {
            agent.add("Je suis désolé, je n'ai pas compris. Pouvez-vous reformuler?");
        }

        async function HeatingTypeIntent(agent) {
            const heatingType = agent.parameters.heating_type;
            if (heatingType === 'électrique') {
                agent.add("Combien de radiateurs électriques avez-vous chez vous ?");
            } else if (heatingType === 'hydraulique') {
                agent.add("Avez-vous un chauffage individuel ou collectif ?");
            }
        }

        function RadiatorsCountIntent(agent) {
            agent.add("Merci. Quelle est la superficie totale de votre maison hors garage ou parking ?");
        }

        async function IndividualOrCollectiveHeatingIntent(agent) {
            const heatingSystem = agent.parameters.heating_system;
            if (heatingSystem === 'individuel') {
                agent.add("Quel type de chaudière avez-vous ?");
            } else if (heatingSystem === 'collectif') {
                agent.add("Merci pour votre temps. Malheureusement, cette offre n'est disponible que pour les systèmes de chauffage individuels.");
            }
        }

        function BoilerTypeIntent(agent) {
            agent.add("Combien de radiateurs avez-vous ?");
        }

        // Map intents to handler functions
        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('HeatingTypeIntent', HeatingTypeIntent);
        intentMap.set('RadiatorsCountIntent', RadiatorsCountIntent);
        intentMap.set('IndividualOrCollectiveHeatingIntent', IndividualOrCollectiveHeatingIntent);
        intentMap.set('BoilerTypeIntent', BoilerTypeIntent);

        // Handle the request with the mapped intents
        agent.handleRequest(intentMap);
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
