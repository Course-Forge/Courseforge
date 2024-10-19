import './App.css';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Pages/Home';
import Navbar from "./components/Navbar";
import Courses from './Pages/Courses';
import Learn from './Pages/Learn';

export default function App() {
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle the click event
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);  // Revert back to default after 300ms
    }, 300);
  };

  useEffect(() => {
    // Attach event listener for click
    document.addEventListener('click', handleClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Router>
      <div className={`app-container ${isClicked ? 'clicked' : ''}`}>
        <Navbar /> {/* Navbar stays on top of the routes */}
        <div className="content-container">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/learn" element={<Learn />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
