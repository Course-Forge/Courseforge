import React from 'react';
import './Courses.css';
import Dropdown from '../components/Dropdown'

function App() {
  return (
    
    <div className="App">
      {/* Main Content */}
      <div className="main-content">
        {/* Title */}
        <header className="App-header">
        <h1 className="gradient-text">Your Courses</h1>
        <div className="tools-icon"></div> {/* Placeholder for the tools icon */}
        </header>
        <Dropdown/>
        
    </div>
  </div>
  );
}

export default App;
