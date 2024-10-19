import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import logo from '../assets/courseforgelogo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Close sidebar if clicked outside
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="burger-menu" onClick={toggleSidebar}>
          <i className="icon-menu"></i>
        </button>
      )}
      <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <div className="logo">🛠️</div>
          {isOpen && (
            <button className="close-menu" onClick={toggleSidebar}>
              <i className="icon-arrow-left"></i>
            </button>
          )}
        </div>
        <div className="menu">
          <a href='/Home' className='menu-item'>
            <i className="icon-chart"></i> {isOpen && <span>Home</span>}
          </a>
          <a href='/Learn' className='menu-item'>
            <i className="icon-map"></i> {isOpen && <span>Learn</span>}
          </a>
          <a href='/Courses' className='menu-item'>
            <i className="icon-theme"></i> {isOpen && <span>Courses</span>}
          </a>
          
          
        </div>
        {isOpen && (
          <div className="profile">
            <span>Ramesh</span>
          </div>
        )}
      </div>
      {!isOpen && (
        <div className="collapsed-profile" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
