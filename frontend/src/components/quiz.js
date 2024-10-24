import React, { useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import './Quiz.css';

const Quiz = () => {
  const quizQuestions = [
    {
      question: "1. What is the definition of displacement?",
      options: ["The total distance traveled", "The change in position of an object", "The speed of an object", "The distance traveled per unit time"],
      answer: "The change in position of an object",
    },
    { 
      question: "2. Which of the following quantities is a vector?",
      options: ["Speed", "Distance", "Acceleration", "Time"],
      answer: "Acceleration",
    },
    {
      question: "3. An object is thrown vertically upward with an initial velocity of 20 m/s. What is its velocity when it reaches its maximum height?",
      options: ["10 m/s", "0 m/s", "-20 m/s", "20 m/s"],
      answer: "0 m/s",
    },
    {
      question: "4. If an object is in free fall near the surface of the Earth, what is the approximate value of its acceleration?",
      options: ["9.8 m/s²", "9.8 km/h²", "0 m/s²", "10 m/s²"],
      answer: "9.8 m/s²",
    },
    {
      question: "5. A car accelerates uniformly from rest to a speed of 30 m/s in 5 seconds. What is the acceleration?",
      options: ["3 m/s²", "6 m/s²", "5 m/s²", "15 m/s²"],
      answer: "6 m/s²",
    },
    {
      question: "6. What is the formula for calculating the distance traveled under constant acceleration?",
      options: ["d = vt", "d = v_i t + 1/2 a t²", "d = v_f t", "d = a t²"],
      answer: "d = v_i t + 1/2 a t²",
    },
    {
      question: "7. Which of the following graphs represents an object at rest?",
      options: ["A horizontal line on a distance-time graph", "A diagonal line on a distance-time graph", "A curve on a distance-time graph", "A horizontal line on a velocity-time graph"],
      answer: "A horizontal line on a distance-time graph",
    },
    {
      question: "8. If a projectile is launched at an angle, which component of its velocity remains constant throughout its flight (ignoring air resistance)?",
      options: ["Vertical component", "Horizontal component", "Total velocity", "None of the above"],
      answer: "Horizontal component",
    },
    {
      question: "9. A ball is thrown horizontally from the top of a cliff. Which factor does NOT affect the time it takes to hit the ground?",
      options: ["The height of the cliff", "The horizontal velocity of the ball", "The acceleration due to gravity", "The initial vertical velocity"],
      answer: "The horizontal velocity of the ball",
    },
    {
      question: "10. An object moves in a circle at a constant speed. What is true about its acceleration?",
      options: ["It is zero", "It is constant in magnitude and direction", "It changes direction constantly", "It is equal to the centripetal force"],
      answer: "It changes direction constantly",
    },
    {
      question: "11. The slope of a distance-time graph represents:",
      options: ["Distance", "Speed", "Acceleration", "Velocity"],
      answer: "Speed",
    },
    {
      question: "12. What happens to the speed of an object if it experiences negative acceleration while moving in the positive direction?",
      options: ["The speed increases", "The speed decreases", "The speed remains constant", "The direction changes"],
      answer: "The speed decreases",
    },
    {
      question: "13. A car travels 300 meters in 10 seconds. What is its average speed?",
      options: ["20 m/s", "30 m/s", "15 m/s", "25 m/s"],
      answer: "30 m/s",
    },
    {
      question: "14. If a stone is thrown straight up with an initial speed of 15 m/s, how high will it rise before stopping momentarily? (Use g = 9.8 m/s²)",
      options: ["11.5 m", "22.5 m", "10.5 m", "20.5 m"],
      answer: "11.5 m",
    },
    {
      question: "15. A projectile is launched at a speed of 40 m/s at an angle of 45 degrees. What is its vertical component of velocity?",
      options: ["20 m/s", "28.3 m/s", "40 m/s", "30 m/s"],
      answer: "28.3 m/s",
    },
    {
      question: "16. In which of the following situations is the acceleration of an object zero?",
      options: ["A car speeding up", "A ball thrown upwards", "A book resting on a table", "A car turning a corner"],
      answer: "A book resting on a table",
    },
    {
      question: "17. What is the relationship between distance and displacement?",
      options: ["They are always equal", "Displacement can be greater than distance", "Displacement is always less than distance", "They are independent of each other"],
      answer: "Displacement is always less than distance",
    },
    {
      question: "18. An object moving with uniform acceleration starts from rest. After 4 seconds, it has traveled 64 meters. What is its acceleration?",
      options: ["4 m/s²", "8 m/s²", "16 m/s²", "2 m/s²"],
      answer: "8 m/s²",
    },
    {
      question: "19. Which kinematic equation relates initial velocity, final velocity, acceleration, and time?",
      options: ["d = v_i t + 1/2 a t²", "v_f = v_i + at", "v_f² = v_i² + 2ad", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "20. Which of the following correctly describes the motion of an object that has a negative acceleration and is moving in the negative direction?",
      options: ["The object speeds up", "The object slows down", "The object moves at constant speed", "The object reverses direction"],
      answer: "The object speeds up",
    }
  ]
  ;

  const [activeStep, setActiveStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = quizQuestions.length;
  
  const handleAnswerSelect = (e) => {
    setUserAnswers({ ...userAnswers, [activeStep]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const progressPercentage = (activeStep / (totalSteps - 1)) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        {/* Stepper Progress Bar */}
        <ProgressBar percent={progressPercentage} filledBackground="linear-gradient(to right, #10CFD9, #0E1A9F)">
          {quizQuestions.map((_, index) => (
            <Step key={index}>
              {({ accomplished }) => (
                <div className={`step-circle ${accomplished ? 'accomplished' : ''}`}>
                  {index + 1}
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </div>

      {/* Quiz Content */}
      <div className="quiz-body">
        {submitted ? (
          <div className="review-section">
            <h3>Review Your Answers</h3>
            <ul>
              {quizQuestions.map((question, index) => (
                <li key={index}>
                  <strong>{question.question}</strong>
                  <p>Your Answer: {userAnswers[index]}</p>
                  <p>Correct Answer: {question.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="question-section">
            <h2>Question {activeStep + 1}/{totalSteps}</h2>
            <h3>{quizQuestions[activeStep].question}</h3>
            <div className="options-container">
              {quizQuestions[activeStep].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name={`question-${activeStep}`}
                    value={option}
                    checked={userAnswers[activeStep] === option}
                    onChange={handleAnswerSelect}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="quiz-footer">
        {activeStep > 0 && <button onClick={handleBack}>Back</button>}
        {activeStep === totalSteps - 1 ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
