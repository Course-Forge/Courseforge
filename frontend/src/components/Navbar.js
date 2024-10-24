import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Close sidebar if clicked outside
    }
  };

  // Function to handle hammer click and change cursor
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false); // Revert cursor back after 200ms
    }, 200);
  };

  useEffect(() => {
    // Handle hammer click globally
    document.addEventListener('click', handleClick);

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`app ${isClicked ? 'clicked' : ''}`}>
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        {!isOpen && (
          <button className="burger-menu" onClick={toggleSidebar}>
            <i className="icon-menu"></i>
          </button>
        )}
        <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
          <div className="sidebar-header">
            <div className="logo">🛠️</div>
          </div>
          <div className="menu">
            <a href='/NewHome' className='menu-item'>
              <i className="icon-chart"></i> {isOpen && <span>Home</span>}
            </a>
            <a href='/Learn' className='menu-item'>
              <i className="icon-map"></i> {isOpen && <span>Learn</span>}
            </a>
            <a href='/Courses' className='menu-item'>
              <i className="icon-theme"></i> {isOpen && <span>Courses</span>}
            </a>
            <a href='/Quiz' className='menu-item'>
              <i className="icon-theme"></i> {isOpen && <span>Quiz</span>}
            </a>
            <a href='/Accordian' className='menu-item'>
              <i className="icon-theme"></i> {isOpen && <span>Accordian</span>}
            </a>
          </div>
          {isOpen && (
            <div className="profile">
              <a href='./Login' className='profile-link'>
                {isOpen && <span>🪪 Sign In</span>}
              </a>
            </div>
          )}
        </div>
        {!isOpen && (
          <div className="collapsed-profile" onClick={toggleSidebar}></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
