import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getDatabase, ref, set } from 'firebase/database';  // Firebase setup
import './Chat.css';

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
        const botResponse = response.data.response;
        addMessage(botResponse, 'gpt');

        // Set course suggestion for confirmation
        setCourseSuggestion(botResponse);
      } catch (error) {
        addMessage('Error communicating with the server.', 'gpt');
        console.error('Error:', error.message);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleAcceptCourse = () => {
    if (courseSuggestion) {
      // Save course to Firebase
      const db = getDatabase();
      const courseRef = ref(db, `courses/${Date.now()}`);
      set(courseRef, {
        courseName: courseSuggestion,
        userMessage: userInput,
      });

      // Notify user and reset suggestion
      addMessage('Course accepted and saved! You can access it from "Your Courses" page.', 'gpt');
      setCourseSuggestion(null);
    }
  };

  const handleDeclineCourse = () => {
    addMessage('Course declined. Please enter a new course.', 'gpt');
    setCourseSuggestion(null);
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
      {courseSuggestion && (
        <div className="course-suggestion">
          <p>Do you want to accept this course suggestion?</p>
          <button onClick={handleAcceptCourse}>Accept</button>
          <button onClick={handleDeclineCourse}>Decline</button>
        </div>
      )}
      <input
        type="text"
        placeholder="Type your course here..."
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
