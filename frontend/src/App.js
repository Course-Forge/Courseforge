import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Chat from './components/Chat';
// import { createCourse } from './services/api'; // Import the createCourse function

const App = () => {

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <MainContent messages />
        <Chat sendMessage />
      </div>
    </div>
  );
};

export default App;

  // const [messages, setMessages] = useState([]);

  // // Function to send message to the backend and receive response
  // const sendMessage = async (message) => {
  //   if (message.trim() !== '') {
  //     setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
  //     // Extract title and description from message (replace with your logic)
  //     const [title, description] = message.split(',');

  //     if (!title || !description) {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: 'gemini', text: 'Please provide both the course title and description separated by a comma.' },
  //       ]);
  //       return;
  //     }

  //     // Send message to the backend and get response
  //     try {
  //       const courseData = await createCourse({ title: title.trim(), description: description.trim() });
  //       handleResponse(courseData); // Handle the response from the backend
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //       // Handle error if necessary (e.g., display error message to user)
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: 'gemini', text: 'Failed to send message. Please try again.' },
  //       ]);
  //     }
  //   }
  // };

  // // Function to handle response from the backend (modify based on response structure)
  // const handleResponse = (courseData) => {
  //   // Assuming courseData contains the enhanced description returned from the backend
  //   const response = `I have enhanced the description: ${courseData.enhanced_description}. Do you accept this? (yes/no)`;
  //   setMessages((prevMessages) => [...prevMessages, { sender: 'gemini', text: response }]);
  // };
