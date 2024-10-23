import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [expandedDay, setExpandedDay] = useState(0); // Track expanded day

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

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? -1 : index);
  };

  const handleNextDay = () => {
    if (expandedDay < Object.keys(courseData.days).length - 1) {
      setExpandedDay(expandedDay + 1);
    }
  };

  const formatMessage = (text) => {
    // Format text with headings, bold, and lists
    text = text.replace(/######\s(.+)/g, '<h6>$1</h6>')
               .replace(/#####\s(.+)/g, '<h5>$1</h5>')
               .replace(/####\s(.+)/g, '<h4>$1</h4>')
               .replace(/###\s(.+)/g, '<h3>$1</h3>')
               .replace(/##\s(.+)/g, '<h2>$1</h2>')
               .replace(/#\s(.+)/g, '<h1>$1</h1>')
               .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.+?)\*/g, '<em>$1</em>')
               .replace(/\*\s(.+)/g, '&nbsp;&nbsp;&nbsp;&nbsp;• $1')
               .replace(/•\s*/g, '<br />&nbsp;&nbsp;&nbsp;&nbsp;• ')
               .replace(/<br \/>+/g, '<br />')
               .replace(/(<strong>.+<\/strong><br \/>)/g, '$1<br />');
    return `<p>${text}</p>`;
  };

  if (!courseData) {
    return <div>Loading course details...</div>;
  }

  return (
    
    <div className="App">
      
      <div className="main-content">
        
        <header className="App-header">
         
        </header>

        <div className="course-details-container">
           {/* Apply formatting to course name */}
          
           <div dangerouslySetInnerHTML={{ __html: formatMessage(`# Course Overview ${courseData.courseName}`) }} />
          {/* Apply formatting to course overview */}
          

          {/* Apply formatting to course length */}
          

          {/* Day-by-Day Breakdown */}
          <h2>Day-by-Day Breakdown</h2>

          {courseData.days && Object.keys(courseData.days).map((dayKey, index) => (
            <div key={index} className="day-section">
              <div className="day-header" onClick={() => toggleDay(index)}>
                {/* Format day title */}
                <div dangerouslySetInnerHTML={{ __html: formatMessage(`### Day ${index + 1}: ${courseData.days[dayKey].title}`) }} />
                <span className="arrow">{expandedDay === index ? '▲' : '▼'}</span>
              </div>

              {expandedDay === index && (
                <div className="day-content">
                  {/* Format day description */}
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(courseData.days[dayKey].description) }} />
                  
                  {/* Format time */}
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(`**Time:** ${courseData.days[dayKey].time} hours`) }} />

                  {/* Format resources */}
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(courseData.days[dayKey].resources) }} />

                  {expandedDay < Object.keys(courseData.days).length - 1 && (
                    <button className="next-day-btn" onClick={handleNextDay}>
                      Next: Day {expandedDay + 2} →
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
