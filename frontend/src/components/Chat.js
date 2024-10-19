import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getDatabase, ref, set } from 'firebase/database';  // Firebase setup
import './Chat.css';
import { db } from '../services/firebase'; // Import the initialized Firebase config

const Chat = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [courseSuggestion, setCourseSuggestion] = useState(null);  // New state for course suggestion
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      addMessage('Hello! What course would you like to learn?', 'gpt');
      hasInitialized.current = true;
    }
  }, []);

  const formatMessage = (text) => {
    // Format text for the chat interface (headings, bold, italics)
    text = text.replace(/######\s(.+)/g, '<h6>$1</h6>')
               .replace(/#####\s(.+)/g, '<h5>$1</h5>')
               .replace(/####\s(.+)/g, '<h4>$1</h4>')
               .replace(/###\s(.+)/g, '<h3>$1</h3>')
               .replace(/##\s(.+)/g, '<h2>$1</h2>')
               .replace(/#\s(.+)/g, '<h1>$1</h1>')
               .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.+?)\*/g, '<em>$1</em>')
               .replace(/\*\s(.+)/g, '&nbsp;&nbsp;&nbsp;&nbsp;• $1')
               .replace(/•\s*/g, '<br />&nbsp;&nbsp;&nbsp;&nbsp;• ')
               .replace(/<br \/>+/g, '<br />')
               .replace(/(<strong>.+<\/strong><br \/>)/g, '$1<br />');
    text = `<p>${text}</p>`;
    return text;
  };

  const addMessage = (text, sender) => {
    const formattedText = formatMessage(text);
    setConversation((prevConversation) => [...prevConversation, { text: formattedText, sender }]);
  };

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newConversation = [...conversation, { text: userInput, sender: 'user' }];
      setConversation(newConversation);
      setUserInput('');
      setIsTyping(true);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chatbot/', { user_message: userInput });
        const botResponse = response.data.response;
        addMessage(botResponse, 'gpt');

        // Set course suggestion for confirmation
        setCourseSuggestion(botResponse);
      } catch (error) {
        addMessage('Error communicating with the server. Please try again later.', 'gpt');
        console.error('Error:', error.message);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleAcceptCourse = async () => {
    if (courseSuggestion) {
      try {
        // Save course to Firebase
        const courseRef = ref(db, `courses/${Date.now()}`);
        await set(courseRef, {
          courseName: courseSuggestion,
          userMessage: conversation[conversation.length - 2]?.text || ''  // Store the last user message
        });

        // Notify user and reset suggestion
        addMessage('Course accepted and saved! You can access it from "Your Courses" page.', 'gpt');
        setCourseSuggestion(null);
      } catch (error) {
        addMessage('Error saving the course to Firebase.', 'gpt');
        console.error('Firebase error:', error);
      }
    }
  };

  const handleDeclineCourse = () => {
    addMessage('Course declined. Please enter a new course.', 'gpt');
    setCourseSuggestion(null);
    setUserInput('');
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
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
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

      {courseSuggestion && (
        <div className="course-suggestion">
          <p>Do you want to accept this course suggestion?</p>
          <button className="cool-button" onClick={handleAcceptCourse}>
            <span>Accept</span> {/* Added span around the text */}
          </button>
          <button className="cool-button" onClick={handleDeclineCourse}>
            <span>Decline</span> {/* Added span around the text */}
          </button>
        </div>
      )}
      
      <input
        type="text"
        placeholder="Type your course here..."
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="cool-button send-button" onClick={sendMessage}>
        <span>Send ✈️</span> {/* Added span around the text */}
      </button>
      <p className="disclaimer">CourseForge can make mistakes. Check important info.</p>
    </div>  
  );
};

export default Chat;
