// src/components/Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener when component is unmounted or sidebar is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="burger-menu" onClick={toggleSidebar}>
         ☰
        </button>
      )}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <>
            <button className="close-menu" onClick={toggleSidebar}>
              ✕
            </button>
          </>
        )}
        <div className="menu">
          <a href="/Home" className="m-1">
            <div className="menu-item">Home</div>
          </a>
          <a href="/Courses" className="m-1">
            <div className="menu-item">Courses</div>
          </a>
          <a href="/Learn" className="m-1">
            <div className="menu-item">Learn Now</div>
          </a>
        </div>
        {isOpen && (
          <div className="profile">
            <span>Ramesh</span>
          </div>
        )}
      </div>
      {!isOpen && (
        <>
          {/* <button className="plus-button" onClick={toggleSidebar}>
            +
          </button> */}
          <div className="collapsed-profile" onClick={toggleSidebar}></div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
