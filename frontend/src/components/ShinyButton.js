import React from 'react';
import './ShinyButton.css';  // Ensure you have the correct CSS file path

const ShinyButton = ({ label, onClick, className }) => {
  return (
    <button className={`shiny-button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ShinyButton;
