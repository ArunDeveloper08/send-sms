// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();



const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;   

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { message, to } = req.body;
  
  // Ensure 'to' starts with +91 for Indian numbers
  const formattedTo = to.startsWith('+') ? to : `+${to}`; // Simple handling, assumes international numbers  c

   console.log({message, formattedTo})
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_NUMBER, // Twilio phone number in E.164 format
      to: formattedTo, // Recipient's phone number in E.164 format (including +91)
    })
    .then((message) => res.json({ success: true, sid: message.sid }))
    .catch((error) => res.status(500).json({ success: false, error }));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
