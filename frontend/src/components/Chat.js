import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      addMessage('Hello! How can I assist you today?', 'gemini');
      hasInitialized.current = true;
    }
  }, []);

  const addMessage = (text, author) => {
    const newMessage = { text, author };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const userMessage = inputValue.trim();
      addMessage(userMessage, 'User');
      setInputValue('');
      setIsTyping(true);

  //     // Send message to backend
  //     axios.post('/api/courseforge/', { message: userMessage })
  //       .then((response) => {
  //         setIsTyping(false);
  //         const { gemini_message } = response.data;
  //         addMessage(gemini_message.text, 'gemini');
  //       })
  //       .catch((error) => {
  //         setIsTyping(false);
  //         addMessage('Error communicating with the server.', 'gemini');
  //         console.error(error);
  //       });
  axios.post('http://127.0.0.1:8000/api/courseforge/', { message: userMessage })
  .then((response) => {
    setIsTyping(false);
    const { gemini_message } = response.data;
    addMessage(gemini_message, 'gemini');
  })
  .catch((error) => {
    setIsTyping(false);
    if (error.response) {
      // Handle 401 Unauthorized separately
      if (error.response.status === 401) {
        addMessage('Unauthorized: Check your API credentials.', 'gemini');
      } else {
        addMessage(`Error: ${error.response.data.error}`, 'gemini');
      }
      console.error('Error Response:', error.response.data);
    } else {
      addMessage('Error communicating with the server.', 'gemini');
      console.error('Error:', error.message);
    }
  });


    }
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.author === 'gemini' ? 'chat-right' : 'chat-left'}`}>
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
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <p className="disclaimer">CourseForge can make mistakes. Check important info.</p>
    </div>
  );
};

export default Chat;
// // Chat.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [userMessage, setUserMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const handleKeyPress = async (e) => {
//     if (e.key === 'Enter') {
//       setIsTyping(true);
//       addMessage(userMessage, 'user');

//       try {
//         const response = await axios.post('http://localhost:8000/api/courseforge/', { message: userMessage });
//         const { gemini_message } = response.data;
//         addMessage(gemini_message, 'gemini');
//       } catch (error) {
//         console.error('Error Response:', error.response.data);
//         console.error('Error Status:', error.response.status);
//         console.error('Error Headers:', error.response.headers);

//         if (error.response) {
//           if (error.response.status === 401) {
//             addMessage('Unauthorized: Check your API credentials.', 'gemini');
//           } else if (error.response.status === 500) {
//             addMessage('Internal Server Error: Check your server logs.', 'gemini');
//           } else {
//             addMessage(`Error: ${error.response.data.error}`, 'gemini');
//           }
//         } else {
//           addMessage('Error communicating with the server.', 'gemini');
//         }
//       } finally {
//         setIsTyping(false);
//       }
//     }
//   };

//   const addMessage = (message, sender) => {
//     setMessages((prevMessages) => [...prevMessages, { message, sender }]);
//     setUserMessage('');
//   };

//   return (
//     <div>
//       <div className="chat-container">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>{msg.message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userMessage}
//         onChange={(e) => setUserMessage(e.target.value)}
//         onKeyPress={handleKeyPress}
//       />
//     </div>
//   );
// };

// export default Chat;
