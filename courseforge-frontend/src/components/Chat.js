import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';
const Chat = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      addMessage('Hello! How can I assist you today?', 'gpt');
      hasInitialized.current = true;
    }
  }, []);

  const addMessage = (text, sender) => {
    setConversation((prevConversation) => [...prevConversation, { text, sender }]);
  };

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newConversation = [...conversation, { text: userInput, sender: 'user' }];
      setConversation(newConversation);
      setUserInput('');
      setIsTyping(true);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chatbot/', { user_message: userInput });
        // const formattedResponse = marked(response.data.response);  // Convert Markdown to HTML
        // addMessage(formattedResponse, 'gpt');
        addMessage(response.data.response, 'gpt');
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.status === 401
            ? 'Unauthorized: Check your API credentials.'
            : `Error: ${error.response.data.error}`;
          addMessage(errorMessage, 'gpt');
          console.error('Error Response:', error.response.data);
        } else {
          addMessage('Error communicating with the server.', 'gpt');
          console.error('Error:', error.user_message);
        }
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    

    <div className="chat-container">
      <div className="chat-messages">
        {conversation.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === 'gpt' ? 'chat-right' : 'chat-left'}`}>
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="chat-message chat-right typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message here..."
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
      <p className="disclaimer">CourseForge can make mistakes. Check important info.</p>
    </div>
  
  );
};

export default Chat;
