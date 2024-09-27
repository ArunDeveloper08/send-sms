import React, { useState } from "react";
import axios from "axios";

const SendSMS = () => {
  const [to, setTo] = useState("+91");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendSMS = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/send-sms", {
        to: to,
        message: message,
      });
      setResponse("SMS sent successfully!");
    } catch (error) {
      setResponse("Failed to send SMS");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>SEND SMS  (TWILIO)</h2>
      <form onSubmit={sendSMS} style={{display :"flex", justifyContent:"space-around"}}>
        <input
          type="text"
          style={{borderRadius:"5px"}}
          placeholder="Recipient's Phone Number (with country code)"
          value={to}
          onChange={(e) =>
            setTo(
              e.target.value.startsWith("+")
                ? e.target.value
                : "+91" + e.target.value
            )
          }
          required
        />

        <textarea
          placeholder="Message"
          style={{borderRadius:"5px" , width :"300px" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send SMS</button>
      </form>
      <p style={{fontSize:"20px" , fontFamily:"monospace" , textShadow:"inherit" , fontWeight:"bold"}}>{response}</p>
    </div>
  );
};

export default SendSMS;
