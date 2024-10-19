import React from 'react';
import './Learn.css';

import MainContent from '../components/MainContent';
import Chat from '../components/Chat';

// import { createCourse } from './services/api'; // Import the createCourse function

const App = () => {


  return (
    <div className="app">
      
      <div className="content">
        <MainContent messages />
      <Chat />
      </div>
    </div>
  );
};

export default App;