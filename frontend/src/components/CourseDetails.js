import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';  
import './CourseDetails.css';


const CourseDetail = () => {
  const { courseId } = useParams();  
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
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
    <div className="main-content">
      {/* Sidebar */}
      
      {/* Main Course Content */}
      <div className="course-details-container">
        <h2>{courseData.courseName}</h2>
        <p><strong></strong> {courseData.userMessage}</p>
        {/* Add other content sections as needed */}
      </div>

      
    </div>
  );
};

export default CourseDetail;
