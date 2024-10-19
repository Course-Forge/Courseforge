// import React from 'react';
// import './Courses.css';
// import Dropdown from '../components/Dropdown'

// function App() {
//   return (
    
//     <div className="App">
//       {/* Main Content */}
//       <div className="main-content">
//         {/* Title */}
//         <header className="App-header">
//         <h1 className="gradient-text">Your Courses</h1>
//         <div className="tools-icon"></div> {/* Placeholder for the tools icon */}
//         </header>
//         <Dropdown/>
        
//     </div>
//   </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';  // For navigation
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();  // For redirecting

  useEffect(() => {
    // Fetch all courses from Firebase
    const db = getDatabase();
    const coursesRef = ref(db, 'courses/');
    
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const courseList = Object.keys(data).map(key => ({
          id: key, 
          ...data[key] 
        }));
        setCourses(courseList);
      }
    });
  }, []);

  // Function to navigate to the course details page
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="App">
      <div className="main-content">
        <header className="App-header">
          <h1 className="gradient-text">Your Courses</h1>
        </header>

        {/* Display each course as a button */}
        <div className="course-buttons">
          {courses.map((course) => (
            <button 
              key={course.id} 
              onClick={() => handleCourseClick(course.id)} 
              className="course-btn">
              {course.courseName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

