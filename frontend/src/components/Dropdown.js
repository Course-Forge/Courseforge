// // import React, { useState, useEffect } from 'react';
// // import { ref, onValue } from 'firebase/database'; // Firebase setup
// // import { db } from '../services/firebase'; // Firebase config
// // import { Link } from 'react-router-dom'; // React Router for navigation
// // import './Dropdown.css';

// // const Dropdown = () => {
// //   const [courses, setCourses] = useState([]);

// //   // Fetch courses from Firebase and update dropdowns
// //   useEffect(() => {
// //     const courseRef = ref(db, 'courses');
// //     const unsubscribe = onValue(courseRef, (snapshot) => {
// //       const coursesData = snapshot.val();
// //       if (coursesData) {
// //         const formattedCourses = Object.entries(coursesData).map(([id, course]) => ({
// //           id,
// //           courseName: course.courseName || `Unnamed Course`,
// //           userMessage: course.userMessage || `No additional details.`,
// //         }));
// //         setCourses(formattedCourses);
// //       }
// //     });

// //     // Cleanup subscription on unmount
// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     <div className="dropdown-container">
// //       <h1>Your Courses</h1>
// //       {/* Render all buttons for courses */}
// //       {courses.map((course) => (
// //         <div key={course.id} className="course-item fade-in">
// //           <Link to={`/course/${course.id}`} className="course-button">
// //             {course.courseName}
// //           </Link>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Dropdown;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../services/firebase'; // Assuming you're using Firebase
// import './Dropdown.css';

// const Dropdown = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the courses from Firebase
//     const fetchCourses = async () => {
//       try {
//         const coursesSnapshot = await db.collection('courses').get();
//         const coursesData = coursesSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCourses(coursesData);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleCourseClick = (courseId) => {
//     navigate(`/courses/${courseId}`); // Navigate to the specific course detail page
//   };

//   return (
//     <div className="courses-grid">
//       {courses.map((course) => (
//         <button
//           key={course.id}
//           className="course-button"
//           onClick={() => handleCourseClick(course.id)}
//         >
//           {course.title.length > 15 ? `${course.title.slice(0, 15)}...` : course.title} 
//           {/* Display a summary of the course */}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Dropdown;
