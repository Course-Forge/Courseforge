import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

export default App;
