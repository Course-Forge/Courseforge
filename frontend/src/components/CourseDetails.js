// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Hook to get the URL parameter
// import { ref, get } from 'firebase/database'; // Firebase setup
// import { db } from '../services/firebase'; // Firebase config
// import './CourseDetails.css';

// const CourseDetails = () => {
//   const { courseId } = useParams(); // Get courseId from URL
//   const [courseDetails, setCourseDetails] = useState(null);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const courseRef = ref(db, `courses/${courseId}`);
//         const snapshot = await get(courseRef);
//         if (snapshot.exists()) {
//           setCourseDetails(snapshot.val());
//         } else {
//           setCourseDetails(null);
//         }
//       } catch (error) {
//         console.error('Error fetching course details:', error);
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId]);

//   if (!courseDetails) {
//     return <div>Loading course details...</div>;
//   }

//   return (
//     <div className="course-details-container">
//       <h1>{courseDetails.courseName}</h1>
//       <p><strong>Description:</strong> {courseDetails.userMessage}</p>
//       {/* Add more details like assignments, projects, etc. as needed */}
//       <p>Additional course content will appear here.</p>
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';  // For accessing URL parameters
import './CourseDetails.css';  // Optional: Style your page

const CourseDetail = () => {
  const { courseId } = useParams();  // Get the course ID from the URL
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Fetch the specific course data from Firebase using the courseId
    const db = getDatabase();
    const courseRef = ref(db, `courses/${courseId}`);

    get(courseRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCourseData(snapshot.val());
      } else {
        console.log('No course data found!');
      }
    }).catch((error) => {
      console.error("Error fetching course data:", error);
    });
  }, [courseId]);

  if (!courseData) {
    return <div>Loading course details...</div>;
  }

  return (
    <div className="course-detail">
      <h2>{courseData.courseName}</h2>
      <p><strong>User Message:</strong> {courseData.userMessage}</p>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default CourseDetail;
