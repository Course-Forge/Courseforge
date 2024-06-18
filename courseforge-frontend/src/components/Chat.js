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

      // Send message to backend
      axios.post('/api/courseforge/', { message: userMessage })
        .then((response) => {
          setIsTyping(false);
          const { gemini_message } = response.data;
          addMessage(gemini_message.text, 'gemini');
        })
        .catch((error) => {
          setIsTyping(false);
          addMessage('Error communicating with the server.', 'gemini');
          console.error(error);
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
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import './Chat.css';
// import { createCourse } from '../services/api'; // Import the createCourse function

// const Footer = ({ sendMessage }) => { // Added sendMessage as a prop
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const hasInitialized = useRef(false);
//   const [currentCourse, setCurrentCourse] = useState(null);

//   useEffect(() => {
//     if (!hasInitialized.current) {
//       addMessage('Hello! Please provide the course title and description separated by a comma.');
//       hasInitialized.current = true;
//     }
//   }, []);

//   const addMessage = (text, author = 'Gemini') => {
//     const newMessage = { text, author };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter' && inputValue.trim() !== '') {
//       addMessage(inputValue, 'User');
//       setInputValue('');
//       setIsTyping(true); // Simulate Gemini response after a delay

//       setTimeout(() => {
//         simulateResponse(inputValue);
//       }, 1000);
//     }
//   };

//   const simulateResponse = async (userInput) => {
//     const [title, description] = userInput.split(',');

//     if (title && description) {
//       try {
//         // Call Django API to create course and get enhanced description
//         const courseData = await createCourse({ title: title.trim(), description: description.trim() });
//         setCurrentCourse(courseData);

//         const response = `I have enhanced the description: ${courseData.enhanced_description}. Do you accept this? (yes/no)`;
//         setIsTyping(false);
//         addMessage(response, 'Gemini');
//       } catch (error) {
//         console.error('Error creating course:', error);
//         addMessage('Failed to create course. Please try again.', 'Gemini');
//         setIsTyping(false);
//       }
//     } else {
//       const response = 'Please provide both the course title and description separated by a comma.';
//       setIsTyping(false);
//       addMessage(response, 'Gemini');
//     }
//   };

//   const handleAcceptance = useCallback(async (userInput) => {
//     if (userInput.toLowerCase() === 'yes' && currentCourse) {
//       const response = 'The course has been created with the first day content!';
//       setIsTyping(false);
//       addMessage(response, 'Gemini');
//       // Implement logic to potentially handle course creation confirmation or further actions based on your backend setup
//     } else if (userInput.toLowerCase() === 'no') {
//       const response = 'Please provide a new course title and description.';
//       setIsTyping(false);
//       addMessage(response, 'Gemini');
//       setCurrentCourse(null); // Reset current course if user rejects
//     }
//   }, [currentCourse]);

//   useEffect(() => {
//     if (currentCourse) {
//       handleAcceptance(inputValue);
//     }
//   }, [currentCourse, handleAcceptance, inputValue]);

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index} className={`chat-message ${message.author === 'Gemini' ? 'chat-right' : 'chat-left'}`}>
//             {message.text}
//           </div>
//         ))}
//         {isTyping && (
//           <div className="chat-message chat-right typing-indicator">
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//           </div>
//         )}
//       </div>
//       <input type="text" placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
//       <p className="disclaimer">CourseForge can make mistakes. Check important info.</p>
//     </div>
//   );
// };

// export default Footer;
