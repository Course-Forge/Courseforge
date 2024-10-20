import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* This is where your App logic lives */}
  </React.StrictMode>,
  document.getElementById('root') // The root element in your index.html
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
