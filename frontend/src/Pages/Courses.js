import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import ParallaxTilt from 'react-parallax-tilt';


import './Courses.css';



const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'courses/');

    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const courseList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setCourses(courseList);
      }
    });

    // Create stars on page load
    createStars(100); // Adjust the number of stars as needed
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const createStars = (numStars) => {
    const starfield = document.querySelector('.starfield');

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 3 + 1; // Random size between 1 and 4
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`; // Random position
      star.style.left = `${Math.random() * 100}vw`; // Random position
      star.style.animationDuration = `${Math.random() * 1 + 0.5}s`; // Random duration
      starfield.appendChild(star);
    }
  };

  return (
    <div className="App">
      <div className="starfield"></div> 
      <div className="main-content">
        <header className="App-header">
          <h1 className="gradient-text">My Courses</h1>
        </header>

        <div className="course-buttons">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <ParallaxTilt>
              <button 
                key={course.id} 
                onClick={() => handleCourseClick(course.id)} 
                className="course-btn">
                <h3 className="course-title">Course {index + 1}</h3> {/* Title Above Course */}
                <h2>{course.courseName}</h2>
                <p>{course.description}</p>
              </button>
              </ParallaxTilt>  
            ))
          ) : (
            <></>
        
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
