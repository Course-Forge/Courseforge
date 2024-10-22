import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

// Function to format the text
const formatMessage = (text) => {
  // Format text for the chat interface (headings, bold, italics)
  text = text.replace(/######\s(.+)/g, '<h6>$1</h6>')
             .replace(/#####\s(.+)/g, '<h5>$1</h5>')
             .replace(/####\s(.+)/g, '<h4>$1</h4>')
             .replace(/###\s(.+)/g, '<h3>$1</h3>')
             .replace(/##\s(.+)/g, '<h2>$1</h2>')
             .replace(/#\s(.+)/g, '<h1>$1</h1>')
             .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // Bold
             .replace(/\*(.+?)\*/g, '<em>$1</em>')              // Italics
             .replace(/\*\s(.+)/g, '&nbsp;&nbsp;&nbsp;&nbsp;• $1')  // Bullet points
             .replace(/•\s*/g, '<br />&nbsp;&nbsp;&nbsp;&nbsp;• ')  // Line breaks for lists
             .replace(/<br \/>+/g, '<br />')
             .replace(/(<strong>.+<\/strong><br \/>)/g, '$1<br />');
  text = `<p>${text}</p>`;  // Wrapping in <p> tag
  return text;
};

const CourseDetail = () => {
  const { courseId } = useParams();  // Getting courseId from route params
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const courseRef = ref(db, `courses/${courseId}`);  // Reference to the specific course

    get(courseRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCourseData(snapshot.val());  // Store course data in state
      } else {
        console.log('No course data found!');
      }
    }).catch((error) => {
      console.error("Error fetching course data:", error);
    });
  }, [courseId]);

  if (!courseData) {
    return <div>Loading course details...</div>;  // Display while loading
  }

  return (
    <div className="main-content">
      <div className="course-details-container">
        <h1>{courseData.courseName}</h1>  {/* Course Name */}
        
        {/* Displaying formatted message */}
        <div dangerouslySetInnerHTML={{ __html: formatMessage(courseData.userMessage) }} />
      </div>
    </div>
  );
};

export default CourseDetail;
