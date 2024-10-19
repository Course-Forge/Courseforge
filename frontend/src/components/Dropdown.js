import React, { useState, useEffect } from 'react';

import './Dropdown.css';


function App() {
    const [dropdowns, setDropdowns] = useState([]);
  
    // Function to add a new course (accordion)
    const addDropdown = () => {
      const newDropdown = {
        title: `Course ${dropdowns.length + 1}`,
        content: `This is the content for Course ${dropdowns.length + 1}.`,
      };
      setDropdowns((prevDropdowns) => [...prevDropdowns, newDropdown]);
    };
  
    // Handle accordion toggle
    const toggleAccordion = (index) => {
      setDropdowns((prevDropdowns) =>
        prevDropdowns.map((dropdown, i) =>
          i === index ? { ...dropdown, isOpen: !dropdown.isOpen } : dropdown
        )
      );
    };
  
    return (
      <div className="app-container">
        
  
        {/* Button to add a new course */}
        <button className="add-course-btn" onClick={addDropdown}>Add Course</button>
  
        {/* Render all dropdowns */}
        {dropdowns.map((dropdown, index) => (
          <div key={index} className="accordion fade-in">
            <div
              className={`accordion-header ${dropdown.isOpen ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {dropdown.title}
            </div>
            <div className={`accordion-content ${dropdown.isOpen ? 'show' : ''}`}>
              {dropdown.content}
            </div>
          </div>
        ))}
      </div>
      
    );
  }
  
  export default App;