import React, { useState, useEffect } from 'react';
import './NewHome.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const message = 'The Future of Learning.';

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setGreeting((prev) => prev + message.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150); // Adjust typing speed here (milliseconds)

    return () => clearInterval(typingInterval);
  }, [message]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Cursor blinking speed

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={darkMode ? 'app-dark' : 'app-light'}>
      <nav className="navbar">
        <div className="navbar-theme-toggle" onClick={toggleDarkMode}>
          <div className={`theme-toggle-circle ${darkMode ? 'toggle-dark' : 'toggle-light'}`}></div>
        </div>
      </nav>
      <main className="hero-section">
        <h3 className="hero-greeting">
          {greeting}
          <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
        </h3>
        <div classname="gradient-text">
        <h1 className="hero-name">Course Forge.</h1>
        </div>
        <p className="hero-description">We plan to revolutionize how students learn, utilizing AI to assist students in learning.
          Please make your way to the "Learn" page to create a new course and head to the "Courses" page to view existing courses. 
          For any personal or business inquiries, please contact us at "courseforgeaigen@gmail.com".</p>
        <div className="hero-buttons">
          <button className="button-secondary">Contact us ↗</button>
          <button className="button-primary">YouTube ↗</button>
          <button className="button-secondary">GitHub ↗</button>
        </div>
      </main>
    </div>
  );
}

export default App;
