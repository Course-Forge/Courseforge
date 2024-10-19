// // import React from 'react';
// // import './Courses.css';
// // import Dropdown from '../components/Dropdown'

// // function App() {
// //   return (
    
// //     <div className="App">
// //       {/* Main Content */}
// //       <div className="main-content">
// //         {/* Title */}
// //         <header className="App-header">
// //         <h1 className="gradient-text">Your Courses</h1>
// //         <div className="tools-icon"></div> {/* Placeholder for the tools icon */}
// //         </header>
// //         <Dropdown/>
        
// //     </div>
// //   </div>
// //   );
// // }

// // export default App;



// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';  // For navigation
// import './Courses.css';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();  // For redirecting

//   useEffect(() => {
//     // Fetch all courses from Firebase
//     const db = getDatabase();
//     const coursesRef = ref(db, 'courses/');
    
//     onValue(coursesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const courseList = Object.keys(data).map(key => ({
//           id: key, 
//           ...data[key] 
//         }));
//         setCourses(courseList);
//       }
//     });
//   }, []);

//   // Function to navigate to the course details page
//   const handleCourseClick = (courseId) => {
//     navigate(`/course/${courseId}`);
//   };

//   return (
//     <div className="App">
//       <div className="main-content">
//         <header className="App-header">
//           <h1 className="gradient-text">Your Courses</h1>
//         </header>

//         {/* Display each course as a button */}
//         <div className="course-buttons">
//           {courses.map((course) => (
//             <button 
//               key={course.id} 
//               onClick={() => handleCourseClick(course.id)} 
//               className="course-btn">
//               {course.courseName}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';  // For navigation
// import './Courses.css';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();  // For redirecting

//   useEffect(() => {
//     // Fetch all courses from Firebase
//     const db = getDatabase();
//     const coursesRef = ref(db, 'courses/');
    
//     onValue(coursesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const courseList = Object.keys(data).map(key => ({
//           id: key, 
//           ...data[key] 
//         }));
//         setCourses(courseList);
//       }
//     });
//   }, []);

//   // Function to generate or use a brief summary (2-3 words)
//   const getCourseSummary = (course) => {
//     // If a summary is already provided in the database
//     if (course.summary) {
//       return course.summary;
//     }
//     // Otherwise, generate a dynamic summary from courseName or description
//     return course.courseName.split(' ').slice(0, 3).join(' ') + '...'; // First 2-3 words
//   };

//   // Function to navigate to the course details page
//   const handleCourseClick = (courseId) => {
//     navigate(`/course/${courseId}`);
//   };



//   return (
//     <div className="App">
//       <div className="main-content">
//         <header className="App-header">
//           <h1 className="gradient-text">Your Courses</h1>
//         </header>

//         {/* Display each course as a button with a brief summary */}
//         <div className="course-buttons">
//           {courses.map((course) => (
//             <button 
//               key={course.id} 
//               onClick={() => handleCourseClick(course.id)} 
//               className="course-btn">
//               {getCourseSummary(course)}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
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

        // For each course, check if a summary exists; if not, generate and store it
        courseList.forEach((course) => {
          if (!course.summary) {
            // Generate the summary if it doesn't exist
            generateSummaryForCourse(course);
          }
        });
      }
    });
  }, []);

  // Function to send course description to the backend and generate summary
  const generateSummaryForCourse = (course) => {
    fetch('/api/generate-course-summary/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_description: course.course_description }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.summary) {
        // Once the summary is generated, store it in Firebase
        storeSummaryInFirebase(course.id, data.summary);
      }
    })
    .catch(error => {
      console.error('Error generating summary:', error);
    });
  };

  // Function to store the generated summary in Firebase
  const storeSummaryInFirebase = (courseId, summary) => {
    const db = getDatabase();
    const courseRef = ref(db, 'courses/' + courseId);

    // Update the course data with the new summary
    set(courseRef, {
      ...courses.find(course => course.id === courseId),  // Keep existing course data
      summary: summary  // Add the summary
    });
  };

  // Function to generate or use a brief summary (2-3 words) for display
  const getCourseSummary = (course) => {
    // If a summary is already provided in the database
    if (course.summary) {
      return course.summary;
    }
    // Otherwise, generate a dynamic placeholder summary from courseName or description
    return course.courseName ? course.courseName.split(' ').slice(0, 3).join(' ') + '...' : 'Loading...';
  };

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

        {/* Display each course as a button with a brief summary */}
        <div className="course-buttons">
          {courses.map((course) => (
            <button 
              key={course.id} 
              onClick={() => handleCourseClick(course.id)} 
              className="course-btn">
              {getCourseSummary(course)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
