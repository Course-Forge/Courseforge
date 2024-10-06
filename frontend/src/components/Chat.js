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

  const formatMessage = (text) => {
    // Format headings (e.g., # Heading -> <h1>Heading</h1>)
    text = text.replace(/######\s(.+)/g, '<h6>$1</h6>')
               .replace(/#####\s(.+)/g, '<h5>$1</h5>')
               .replace(/####\s(.+)/g, '<h4>$1</h4>')
               .replace(/###\s(.+)/g, '<h3>$1</h3>')
               .replace(/##\s(.+)/g, '<h2>$1</h2>')
               .replace(/#\s(.+)/g, '<h1>$1</h1>');
  
    // Format bold text (e.g., **bold** -> <strong>bold</strong>)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
    // Format italic text (e.g., *italic* -> <em>italic</em>)
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
    // Add line breaks before and after section headers (e.g., bold topics)
    text = text.replace(/(?:\*\*)(.+?):/g, '<br /><strong>$1</strong><br />');
  
    // Add indentation for subtopics (indentation for bullet points)
    text = text.replace(/\*\s(.+)/g, '&nbsp;&nbsp;&nbsp;&nbsp;• $1');
  
    // Ensure bullet points are consistently spaced with line breaks
    text = text.replace(/•\s*/g, '<br />&nbsp;&nbsp;&nbsp;&nbsp;• ');
  
    // Remove excessive line breaks between sections
    text = text.replace(/<br \/>+/g, '<br />');
  
    // Add an extra line break after section headers for clarity
    text = text.replace(/(<strong>.+<\/strong><br \/>)/g, '$1<br />');
  
    // Wrap the entire text in paragraph tags for better separation and spacing
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
      setUserInput('');  // Reset input after accepting the course
    }
  };

  const handleDeclineCourse = () => {
    addMessage('Course declined. Please enter a new course.', 'gpt');
    setCourseSuggestion(null);
    setUserInput('');  // Reset input after declining the course
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
            {/* Display formatted text using dangerouslySetInnerHTML */}
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
