// src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="burger-menu" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <>
            <button className="close-menu" onClick={toggleSidebar}>
              ✕
            </button>

          </>
        )}
         <div className="menu">
        <a href='/' className='m-1'><div className="menu-item">Home</div></a>
        <a href='/Courses' className='m-1'><div className="menu-item">Courses</div></a>
        <a href='/Learn' className='m-1'><div className="menu-item">Learn Now</div></a>
          
        </div>
        {isOpen && (
          <div className="profile">
            <span>Saket Tilak</span>
          </div>
        )}
      </div>
      {!isOpen && (
        <>
          <button className="plus-button" onClick={toggleSidebar}>
            +
          </button>
          <div className="collapsed-profile" onClick={toggleSidebar}>
            <img src="assets/saketprofile.png" alt="Profile" />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
