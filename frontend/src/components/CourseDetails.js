// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom'; // Hook to get the URL parameter
// // import { ref, get } from 'firebase/database'; // Firebase setup
// // import { db } from '../services/firebase'; // Firebase config
// // import './CourseDetails.css';

// // const CourseDetails = () => {
// //   const { courseId } = useParams(); // Get courseId from URL
// //   const [courseDetails, setCourseDetails] = useState(null);

// //   useEffect(() => {
// //     const fetchCourseDetails = async () => {
// //       try {
// //         const courseRef = ref(db, `courses/${courseId}`);
// //         const snapshot = await get(courseRef);
// //         if (snapshot.exists()) {
// //           setCourseDetails(snapshot.val());
// //         } else {
// //           setCourseDetails(null);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching course details:', error);
// //       }
// //     };

// //     fetchCourseDetails();
// //   }, [courseId]);

// //   if (!courseDetails) {
// //     return <div>Loading course details...</div>;
// //   }

// //   return (
// //     <div className="course-details-container">
// //       <h1>{courseDetails.courseName}</h1>
// //       <p><strong>Description:</strong> {courseDetails.userMessage}</p>
// //       {/* Add more details like assignments, projects, etc. as needed */}
// //       <p>Additional course content will appear here.</p>
// //     </div>
// //   );
// // };

// // export default CourseDetails;

// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get } from 'firebase/database';
// import { useParams } from 'react-router-dom';  // For accessing URL parameters
// import './CourseDetails.css';  // Optional: Style your page

// const CourseDetail = () => {
//   const { courseId } = useParams();  // Get the course ID from the URL
//   const [courseData, setCourseData] = useState(null);

//   useEffect(() => {
//     // Fetch the specific course data from Firebase using the courseId
//     const db = getDatabase();
//     const courseRef = ref(db, `courses/${courseId}`);

//     get(courseRef).then((snapshot) => {
//       if (snapshot.exists()) {
//         setCourseData(snapshot.val());
//       } else {
//         console.log('No course data found!');
//       }
//     }).catch((error) => {
//       console.error("Error fetching course data:", error);
//     });
//   }, [courseId]);

//   if (!courseData) {
//     return <div>Loading course details...</div>;
//   }

//   return (
//     <div className="course-detail">
//       <h2>{courseData.courseName}</h2>
//       <p><strong>User Message:</strong> {courseData.userMessage}</p>
//       {/* Add any other details you want to display */}
//     </div>
//   );
// };

// export default CourseDetail;

// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get } from 'firebase/database';
// import { useParams } from 'react-router-dom';
// import './CourseDetails.css';

// const CourseDetails = () => {
//     const { courseId } = useParams();  // Get course ID from the URL parameters
//     const [courseData, setCourseData] = useState(null);

//     useEffect(() => {
//         // Fetch course data from Firebase using the courseId
//         const db = getDatabase();
//         const courseRef = ref(db, `courses/${courseId}`);

//         get(courseRef).then((snapshot) => {
//             if (snapshot.exists()) {
//                 setCourseData(snapshot.val());  // Store the course data in state
//             } else {
//                 console.log('No course data found!');
//             }
//         }).catch((error) => {
//             console.error('Error fetching course data:', error);
//         });
//     }, [courseId]);

//     if (!courseData) {
//         return <div>Loading course details...</div>;
//     }

//     return (
//         <div className="course-details-container">
//             <h2>Course Details</h2>
//             <p><strong>Course Description:</strong> {courseData.course_description}</p>
//             <p><strong>Course Summary:</strong> {courseData.summary}</p>
//         </div>
//     );
// };

// export default CourseDetails;

// 

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for next day navigation
import { getDatabase, ref, onValue } from 'firebase/database';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedDay, setExpandedDay] = useState(0); // Track expanded day (starting with Day 1)
  const navigate = useNavigate(); // Used for navigating between days

  useEffect(() => {
    // Fetch course details from Firebase
    const db = getDatabase();
    const courseRef = ref(db, `courses/${courseId}`);

    onValue(courseRef, (snapshot) => {
      const data = snapshot.val();
      setCourse(data);
    });
  }, [courseId]);

  // Function to toggle the expanded day
  const toggleDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  // Function to handle the Next button, moving to the next day
  const handleNextDay = () => {
    if (expandedDay !== null && expandedDay < Object.keys(course.days).length - 1) {
      setExpandedDay(expandedDay + 1);
    }
  };

  return (
    <div className="App">
      <div className="main-content">
        {/* Header displaying the course name */}
        <header className="App-header">
          <h1 className="summary">{course?.courseName}</h1>
        </header>

        {course ? (
          <div className="course-details">
            {/* Course Overview */}
            <h2>Course Overview</h2>
            <p>{course.summary}</p>

            {/* Course Length */}
            <h2>Course Length</h2>
            <p>This course is expected to take {course.length} days/weeks.</p>

            {/* Day-by-Day Breakdown with Next button */}
            <h2>Day-by-Day/Week-by-Week Breakdown</h2>

            {course.days && Object.keys(course.days).map((dayKey, index) => (
              <div key={index} className="day-section">
                <div className="day-header" onClick={() => toggleDay(index)}>
                  <h3>{`Day ${index + 1}: ${course.days[dayKey].title}`}</h3>
                  <span className="arrow">{expandedDay === index ? '▲' : '▼'}</span>
                </div>

                {/* Show day content only if it's expanded */}
                {expandedDay === index && (
                  <div className="day-content">
                    <p><strong>Overview:</strong> {course.days[dayKey].description}</p>
                    <p><strong>Assignment/Project:</strong> {course.days[dayKey].assignment}</p>
                    <p><strong>Quiz:</strong> {course.days[dayKey].quiz}</p>
                    <p><strong>Resources:</strong> {course.days[dayKey].resources}</p>

                    {/* Next button to navigate to the next day */}
                    {expandedDay < Object.keys(course.days).length - 1 && (
                      <button className="next-day-btn" onClick={handleNextDay}>
                        Next: Day {expandedDay + 2} →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading course details...</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
