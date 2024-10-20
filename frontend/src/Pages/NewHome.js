
import React from 'react';
import './NewHome.css';

const App = () => {
  return (
    <div className="app">
      <div className="glow-container">
        <div className="glow-text">
          <p className="staircase-line line1">Welcome</p>
          <p className="staircase-line line2">to</p>
          <p className="staircase-line line3">CourseForge...</p>
        </div>
        <p className="subtext">
          We plan to revolutionize how students learn, utilizing AI to assist students in learning.
          Please make your way to the "Learn" page to create a new course and head to the "Courses" page to view existing courses. 
          For any personal or business inquiries, please contact us at "courseforgeaigen@gmail.com"
        </p>
      </div>
    </div>
  );
};

export default App;

