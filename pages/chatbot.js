import React, { useState } from 'react';
import axios from 'axios';
import styles from "@/styles/Home.module.css"; 

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        // Envoyer la requête à l'API Google
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCvXSi8Gbrv2sdVQebEBWSICJknMoAOr68',
          {
            contents: [
              {
                parts: [
                  { text: input }
                ]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        // Extraire le texte de la réponse
        const botMessageText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'pas de réponse de l\'API';
        const botMessage = { sender: 'bot', text: botMessageText };
        setMessages(prevMessages => [...prevMessages, botMessage]);

      } catch (error) {
        console.error('Erreur complète :', error);
        const errorMessage = { sender: 'bot', text: `Erreur API: ${error.response?.status || 'inconnue'} - ${error.message}` };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }

      setInput('');  // Vider le champ input après l'envoi
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="root-container">
      <div className="chatbot">
        <div className="chatbox">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Tapez un message..."
        />
        <button className="send-button" onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default Chatbot;