import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.sender}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatMessage;
