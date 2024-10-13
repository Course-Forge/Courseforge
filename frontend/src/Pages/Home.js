import React from 'react';
import './Home.css';

import MainContent from '../components/MainContent';
import Chat from '../components/Chat';

const App = () => {

  return (
    <div className="app">
    
      <div className="content">
        <MainContent messages />
        <Chat sendMessage />
      </div>
    </div>
  );
};

export default App;



