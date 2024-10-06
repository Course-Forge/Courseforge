import './App.css';
import React from "react";




import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from "./components/Navbar";
import Courses from './Pages/Courses';
import Learn from './Pages/Learn';




export default function App() {
  return (
    <Router>
      <div className="app-container">
      <Navbar /> {/* Navbar stays on top of the routes */}
        <div className="content-container">
          
          <Routes>
            <Route index element={ <Home />}></Route>
            <Route path="/courses" element={ <Courses /> }></Route>
            <Route path="/learn" element={ <Learn /> }></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}