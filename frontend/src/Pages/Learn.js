import React, { useState, useEffect } from 'react';
import './Learn.css'; // Import your CSS styling

import MainContent from '../components/MainContent'; // MainContent component
import Chat from '../components/Chat'; // Chat component

const Learn = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle hammer click and change cursor
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false); // Revert cursor back after 200ms
    }, 200);
  };

  useEffect(() => {
    // Attach click event to change cursor on body
    document.addEventListener('click', handleClick);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`app ${isClicked ? 'clicked' : ''}`}>
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <button className="burger-menu" onClick={toggleSidebar}>
          ☰
        </button>
        {isSidebarOpen && (
          <button className="close-menu" onClick={toggleSidebar}>
            ×
          </button>
        )}

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <img src="/path/to/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="menu">
            <div className="menu-item icon-chart">Dashboard</div>
            <div className="menu-item icon-map">Schedule</div>
            <div className="menu-item icon-theme">Map</div>
            <div className="menu-item icon-components">Tools</div>
            <div className="menu-item icon-ecommerce">Shop</div>
            <div className="menu-item icon-calendar">Calendar</div>
          </div>
          <div className="profile">Profile</div>
        </div>
      </div>

      <div className="content">
        <MainContent /> {/* Include your MainContent component */}
        <Chat /> {/* Include your Chat component */}
      </div>
    </div>
  );
};

export default Learn;
