// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from './Pages/Home';
// import Navbar from "./components/Navbar";
// import Courses from './Pages/Courses';
// import Learn from './Pages/Learn';
// // import Chat from './components/Chat';
// // import MainContent from './components/MainContent';



// export default function App() {
//   return (
//     <Router>
//       <div className="app-container">
//       <Navbar /> {/* Navbar stays on top of the routes */}
//         <div className="content-container">
          
//           <Routes>
//             <Route index element={ <Home />}></Route>
//             <Route path="/courses" element={ <Courses /> }></Route>
//             <Route path="/learn" element={ <Learn /> }></Route>
//           </Routes> 

          
//         </div>
//         {/* <div className="content">
//         <MainContent messages />
//         <Chat sendMessage />
//       </div> */}
//       </div>
//     </Router>
//   );
// }

import './App.css';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from "./components/Navbar";
import Courses from './Pages/Courses';
import Learn from './Pages/Learn';
import CourseDetail from './components/CourseDetails'; // Import the new detail page
import NewHome from './Pages/NewHome';
import Login from './components/Login';
import Quiz from './components/quiz';
import Accordian from './components/accordian';

export default function App() {
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle the click event
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);  // Revert back to default after 200ms
    }, 200);
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
            <Route index element={ <Home />}></Route>
            <Route path="/courses" element={ <Courses /> }></Route>
            <Route path="/learn" element={ <Learn /> }></Route>
            {/* Dynamic route for course details */}
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/newhome" element={<NewHome />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/accordian" element={<Accordian/>}></Route>
          </Routes> 
        </div>
      </div>
    </Router>
  );
}
