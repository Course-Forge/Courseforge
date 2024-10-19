// import React from 'react';
// import './Home.css';

// import MainContent from '../components/MainContent';
// import Chat from '../components/Chat';

// const App = () => {

//   return (
//     <div className="app">
    
//       <div className="content">
//         <MainContent messages />
//         <Chat sendMessage />
//       </div>
//     </div>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import CourseDetails from '../components/CourseDetails';
import Chat from '../components/Chat'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dropdown />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
