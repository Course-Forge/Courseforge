import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import ReactPaginate from 'react-paginate';
import Quiz from "./quiz";
import './accordian.css';

const data = [
  {
    day: "Day 1",
    accordions: [
      {
        title: "Day 1 - Lecture",
        content: (
          <>
            <b><p> Course:</p></b>
            
            <p> Introduction to Kinematics Module 1: Understanding Kinematics Lesson 1.1: What is Kinematics? Definition: Kinematics is the branch of classical mechanics that deals with the description of motion without considering the forces that cause it. It focuses on analyzing how objects move, using parameters such as position, velocity, and acceleration.</p>

            <b><p>Key Concepts:</p></b>

<p>Position (x): The location of an object at a given point in time, usually described in terms of coordinates (e.g., meters from a reference point). Displacement (&#916;x): The change in position of an object; a vector quantity. Velocity (v): The rate of change of displacement over time. It can be constant or variable and is a vector. Speed (s): The magnitude of velocity, describing how fast an object is moving regardless of direction; a scalar quantity. Acceleration (a): The rate of change of velocity over time; a vector. Real-Life Example: Consider a car driving down a straight road. Kinematics helps describe the car&rsquo;s motion in terms of its velocity and acceleration over time, without worrying about what makes the car move (engine power, friction, etc.).</p>


<p><b>Definition:</b> Scalars are quantities that have only magnitude (size or numerical value), without any direction. Examples: Distance (e.g., 100 meters) Speed (e.g., 60 km/h) Time (e.g., 5 seconds) Mass (e.g., 10 kg) Vector Quantities:</p>

<p><b>Definition:</b> Vectors are quantities that have both magnitude and direction. Examples: Displacement (e.g., 100 meters north) Velocity (e.g., 60 km/h east) Acceleration (e.g., 9.8 m/s&sup2; downward) Force (e.g., 50 N to the right) Comparison:</p>

<p>Property Scalar Vector Magnitude Yes Yes Direction No Yes Example Distance (10 m) Displacement (10 m east) Lesson 2.2: Visualizing Scalars and Vectors Graphical Representation of Vectors:</p>

<p>Vectors are typically represented as arrows. The length of the arrow indicates the magnitude, and the direction of the arrow shows the direction of the vector. Example: If you walk 5 meters north, you can draw an arrow pointing north with a length proportional to 5 meters. Operations on Vectors:</p>

<b>Addition of Vectors:</b>

<p>Use the tip-to-tail method: Place the tail of one vector at the tip of another, and the resultant vector goes from the tail of the first to the tip of the last. Example: If you walk 3 meters east and then 4 meters north, the resultant displacement can be found using the Pythagorean theorem (result = 5 meters northeast). Vector Subtraction:</p>

<p>Subtract a vector by adding its opposite (a vector of the same magnitude but opposite direction). Applications: Vectors are essential in understanding physical phenomena such as force, momentum, and velocity in directions other than just a straight line.</p>
<iframe width="100% " height="500"  src="https://www.youtube.com/embed/EwSHKuSxX_8?si=g6cAHtSV2x9TLNJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<b>Lesson 2.3: Examples and Exercises Example 1: Scalar vs. Vector</b>

<p>A person walks 10 meters in a straight line. Distance (scalar) = 10 meters. Displacement (vector) = 10 meters east (if they walked east). Practice Problem:</p>

<p>A car travels 100 meters north, then 100 meters east. What is the car&rsquo;s displacement?</p>

<p>Solution: Use the Pythagorean theorem. Displacement = &#8730;(100&sup2; + 100&sup2;) = 141.4 meters northeast. If a runner completes one lap around a circular track of 400 meters, what are their total distance and displacement?</p>

<p>Answer: Distance: 400 meters. Displacement: 0 meters (they end up at the starting point).</p>
          </>
        ),
      },
      {
        title: "Day 1 - Lecture 2",
        content: (
          <>
            <p>Course: Motion in One Dimension (1D) Module 1: Introduction to Motion in One Dimension Lesson 1.1: What is Motion in One Dimension? Definition: Motion in one dimension refers to the movement of an object along a straight line, either in a positive or negative direction relative to a reference point. It's the simplest form of motion, where the object moves in only one direction at a time (e.g., horizontally or vertically).</p>

<p>Key Concepts:</p>

<p>Position: The location of an object at a particular time along a straight path. Direction: Objects can move in positive or negative directions relative to the origin (e.g., forward/backward, up/down). Real-Life Example: A car driving on a straight road, an elevator moving vertically, or a person running on a straight track all represent motion in one dimension.</p>

<p>Quiz Example:</p>

<p>Which of the following is an example of motion in one dimension? a) A car driving around a circular track b) A person walking down a straight hallway c) A bird flying in a zigzag pattern Correct Answer: b) A person walking down a straight hallway Module 2: Distance and Displacement Lesson 2.1: Understanding Distance and Displacement Distance:</p>

<p>Definition: Distance is the total length of the path traveled by an object, regardless of direction. It&rsquo;s a scalar quantity and only has magnitude. Example: If a person walks 5 meters forward and 5 meters back, the total distance covered is 10 meters. Displacement:</p>

<p>Definition: Displacement is the change in position of an object in a specific direction. It&rsquo;s a vector quantity and depends on both magnitude and direction. Example: If the same person walks 5 meters forward and 5 meters back to the starting point, the displacement is 0 meters (since they returned to the same position). Comparison:</p>

<p>Property Distance Displacement Type Scalar Vector Consideration Path traveled Start and end points Example 10 meters (total walked) 0 meters (end at start) Quiz Example:</p>

<p>If you walk 10 meters north, then 10 meters south, what is your distance and displacement? Answer: Distance: 20 meters Displacement: 0 meters Module 3: Speed and Velocity Lesson 3.1: Understanding Speed and Velocity Speed:</p>

<p>Definition: Speed is the rate at which an object covers distance. It&rsquo;s a scalar quantity and has no direction. Formula:  Speed = Distance Time Speed=  Time Distance &#8203;   Example: If a car covers 100 meters in 5 seconds, its speed is  100 5 = 20 &#8201; m/s 5 100 &#8203;  =20m/s. Velocity:</p>

<p>Definition: Velocity is the rate of change of displacement. It&rsquo;s a vector quantity and includes both magnitude and direction. Formula:  Velocity = Displacement Time Velocity=  Time Displacement &#8203;   Example: If the same car moves 100 meters east in 5 seconds, its velocity is  100 5 = 20 &#8201; m/s 5 100 &#8203;  =20m/s east. Comparison:</p>

<p>Property Speed Velocity Type Scalar Vector Formula Distance/Time Displacement/Time Example 20 m/s 20 m/s east Quiz Example:</p>

<p>A car travels 50 meters north in 10 seconds. What is its velocity? Answer:  50 10 = 5 &#8201; m/s 10 50 &#8203;  =5m/s north. Module 4: Average and Instantaneous Velocity Lesson 4.1: Average Velocity Definition: Average velocity is the total displacement divided by the total time taken.</p>

<p>Formula:  Average&#160;Velocity = &#916; &#55349;&#56421; &#916; &#55349;&#56417; Average&#160;Velocity=  &#916;t &#916;x &#8203;   Example: If a car moves 100 meters north in 20 seconds, the average velocity is  100 20 = 5 &#8201; m/s 20 100 &#8203;  =5m/s. Lesson 4.2: Instantaneous Velocity Definition: Instantaneous velocity is the velocity of an object at a specific moment in time. It can be found by calculating the derivative of displacement with respect to time.</p>

<p>Example: If you look at a car&rsquo;s speedometer, it gives the car's instantaneous velocity at that moment. Comparison:</p>

<p>Property Average Velocity Instantaneous Velocity Definition Displacement/Total time Velocity at a specific moment Example 5 m/s over 20 seconds 60 km/h at that instant Quiz Example:</p>

<p>If a car travels 100 meters north in 20 seconds, what is its average velocity? Answer:  5 &#8201; m/s 5m/s north. Module 5: Acceleration (Uniform and Non-uniform) Lesson 5.1: Uniform Acceleration Definition: Uniform acceleration occurs when an object&rsquo;s velocity changes at a constant rate.</p>

<p>Formula:  &#55349;&#56398; = &#916; &#55349;&#56419; &#916; &#55349;&#56417; a=  &#916;t &#916;v &#8203;   Example: If a car's velocity increases from 0 m/s to 20 m/s in 5 seconds, its acceleration is  20 &#8722; 0 5 = 4 &#8201; m/s 2 5 20&#8722;0 &#8203;  =4m/s  2  . Lesson 5.2: Non-uniform Acceleration Definition: Non-uniform acceleration occurs when an object&rsquo;s velocity changes at a varying rate over time.</p>

<p>Example: A car speeding up and slowing down unpredictably while driving through city traffic experiences non-uniform acceleration. Comparison:</p>

<p>Property Uniform Acceleration Non-uniform Acceleration Rate of Change Constant Varying Example Free-falling object Car in stop-and-go traffic Quiz Example:</p>

<p>A car&rsquo;s velocity changes from 10 m/s to 30 m/s in 5 seconds. What is its acceleration? Answer:  30 &#8722; 10 5 = 4 &#8201; m/s 2 5 30&#8722;10 &#8203;  =4m/s  2  .</p>
          </>
        ),
      },
      {
        title: "Day 1 - Quiz",
        content: (
          <>
            <Quiz></Quiz>
          </>
        ),
      },
    ],
  },
  {
    day: "Day 2",
    accordions: [
      {
        title: "Day 2 - Lecture",
        content: (
          <>
           <h1>Course: Distinguishing Between Distance vs. Displacement and Speed vs. Velocity</h1>

<h2>Module 1: Introduction to Motion Quantities</h2>

<h3>Lesson 1.1: Definitions of Distance, Displacement, Speed, and Velocity</h3>
<p><strong>Objective:</strong> By the end of this lesson, students should be able to clearly distinguish between distance and displacement as well as speed and velocity.</p>

<h4>Topic 1: Distance vs. Displacement</h4>
<h5>Distance:</h5>
<ul>
  <li><strong>Definition:</strong> Distance is the total length of the path an object has traveled, regardless of direction. It’s a scalar quantity (magnitude only).</li>
  <li><strong>Example:</strong> A runner completes a 400-meter lap around a circular track. The distance traveled is 400 meters.</li>
</ul>

<h5>Displacement:</h5>
<ul>
  <li><strong>Definition:</strong> Displacement is the straight-line distance between the starting point and the final position, including direction. It’s a vector quantity (magnitude + direction).</li>
  <li><strong>Example:</strong> If the same runner returns to the starting point, their displacement is 0 meters, even though they traveled 400 meters in distance.</li>
</ul>

<h4>Comparison Table:</h4>
<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>Distance</th>
      <th>Displacement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Scalar</td>
      <td>Vector</td>
    </tr>
    <tr>
      <td>Direction</td>
      <td>Not considered</td>
      <td>Considered</td>
    </tr>
    <tr>
      <td>Example</td>
      <td>400 meters (track lap)</td>
      <td>0 meters (end at start)</td>
    </tr>
  </tbody>
</table>

<h4>Topic 2: Speed vs. Velocity</h4>
<h5>Speed:</h5>
<ul>
  <li><strong>Definition:</strong> Speed is the rate at which an object covers distance. It’s a scalar quantity and has no direction.</li>
  <li><strong>Formula:</strong> Speed = Distance / Time</li>
  <li><strong>Example:</strong> If a car covers 120 kilometers in 2 hours, its speed is 60 km/h.</li>
</ul>

<h5>Velocity:</h5>
<ul>
  <li><strong>Definition:</strong> Velocity is the rate of change of displacement. It’s a vector quantity and includes both magnitude and direction.</li>
  <li><strong>Formula:</strong> Velocity = Displacement / Time</li>
  <li><strong>Example:</strong> If the same car moves 120 kilometers east in 2 hours, its velocity is 60 km/h east.</li>
</ul>

<h4>Comparison Table:</h4>
<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>Speed</th>
      <th>Velocity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type</td>
      <td>Scalar</td>
      <td>Vector</td>
    </tr>
    <tr>
      <td>Formula</td>
      <td>Distance / Time</td>
      <td>Displacement / Time</td>
    </tr>
    <tr>
      <td>Direction</td>
      <td>Not considered</td>
      <td>Considered</td>
    </tr>
  </tbody>
</table>

<h2>Module 2: Instantaneous vs. Average Speed/Velocity</h2>

<h3>Lesson 2.1: Understanding Instantaneous and Average Speed/Velocity</h3>
<p><strong>Objective:</strong> Students will understand the difference between instantaneous and average measurements for speed and velocity and be able to apply them to real-world scenarios.</p>

<h4>Topic 1: Instantaneous Speed/Velocity</h4>
<h5>Instantaneous Speed:</h5>
<ul>
  <li><strong>Definition:</strong> The speed of an object at a specific moment in time. It can be read directly from a speedometer.</li>
  <li><strong>Example:</strong> When you glance at a car’s speedometer and it shows 50 km/h, that’s the car’s instantaneous speed at that moment.</li>
</ul>

<h5>Instantaneous Velocity:</h5>
<ul>
  <li><strong>Definition:</strong> The velocity of an object at a specific moment, considering both magnitude and direction.</li>
  <li><strong>Example:</strong> A car moving at 50 km/h east at a particular instant has an instantaneous velocity of 50 km/h east.</li>
</ul>

<h4>Topic 2: Average Speed/Velocity</h4>
<h5>Average Speed:</h5>
<ul>
  <li><strong>Definition:</strong> Average speed is the total distance traveled divided by the total time taken.</li>
  <li><strong>Formula:</strong> Average Speed = Total Distance / Total Time</li>
  <li><strong>Example:</strong> If you travel 120 kilometers in 2 hours, your average speed is 60 km/h, even if you varied your speed along the way.</li>
</ul>

<h5>Average Velocity:</h5>
<ul>
  <li><strong>Definition:</strong> Average velocity is the total displacement divided by the total time taken.</li>
  <li><strong>Formula:</strong> Average Velocity = Total Displacement / Total Time</li>
  <li><strong>Example:</strong> If you travel 120 kilometers east in 2 hours, your average velocity is 60 km/h east, even if you stopped for breaks.</li>
</ul>

<h4>Comparison Table:</h4>
<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>Instantaneous Speed</th>
      <th>Average Speed</th>
      <th>Instantaneous Velocity</th>
      <th>Average Velocity</th>
    </tr>
  </thead>
  <iframe width="1200" height="700" src="https://www.youtube.com/embed/hpWuZh6oTew?si=EsPOhUiSf7HdRcVe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
  <tbody>
    <tr>
      <td>Type</td>
      <td>Scalar</td>
      <td>Scalar</td>
      <td>Vector</td>
      <td>Vector</td>
    </tr>
    <tr>
      <td>Time Frame</td>
      <td>Specific moment</td>
      <td>Total time</td>
      <td>Specific moment</td>
      <td>Total time</td>
    </tr>
  </tbody>
</table>

<h2>Module 3: Solving Problems Involving These Quantities</h2>

<h3>Lesson 3.1: Practice Problems on Distance, Displacement, Speed, and Velocity</h3>
<p><strong>Objective:</strong> Students will apply the concepts of distance, displacement, speed, and velocity to solve various types of problems.</p>

<h4>Problem 1: Distance and Displacement</h4>
<p>A runner completes a lap around a 400-meter track, starting and ending at the same point.</p>
<p><strong>Find:</strong></p>
<ul>
  <li>The total distance traveled.</li>
  <li>The total displacement.</li>
</ul>
<p><strong>Solution:</strong></p>
<ul>
  <li><strong>Distance:</strong> 400 meters (the full lap).</li>
  <li><strong>Displacement:</strong> 0 meters (the runner returned to the starting point).</li>
</ul>

<h4>Problem 2: Speed and Velocity</h4>
<p>A car travels 100 kilometers north in 2 hours and then travels 100 kilometers south in 2 hours.</p>
<p><strong>Find:</strong></p>
<ul>
  <li>The total distance.</li>
  <li>The total displacement.</li>
  <li>The average speed.</li>
  <li>The average velocity.</li>
</ul>
<p><strong>Solution:</strong></p>
<ul>
  <li><strong>Total Distance:</strong> 100 km + 100 km = 200 km</li>
  <li><strong>Total Displacement:</strong> 0 km (since the car returned to the starting point).</li>
  <li><strong>Average Speed:</strong> 200 km / 4 hours = 50 km/h</li>
  <li><strong>Average Velocity:</strong> 0 km / 4 hours = 0 km/h</li>
</ul>

<h4>Problem 3: Instantaneous and Average Velocity</h4>
<p>A person walks 30 meters north in 5 seconds, then stands still for 10 seconds, and then walks 20 meters south in 5 seconds.</p>
<p><strong>Find:</strong></p>
<ul>
  <li>The total displacement.</li>
  <li>The average velocity.</li>
  <li>The instantaneous velocity during the first 5 seconds.</li>
</ul>
<p><strong>Solution:</strong></p>
<ul>
  <li><strong>Total Displacement:</strong> 30 m - 20 m = 10 m north.</li>
  <li><strong>Average Velocity:</strong> 10 m / 20 seconds = 0.5 m/s north.</li>
  <li><strong>Instantaneous Velocity (during first 5 seconds):</strong> 30 m / 5 seconds = 6 m/s north.</li>
</ul>

<h2>Module 4: Recap and Final Assessment</h2>

<h3>Lesson 4.1: Review of Key Concepts</h3>
<ul>
  <li><strong>Distance</strong> is the total path traveled, while <strong>displacement</strong> is the straight-line distance between start and end points.</li>
  <li><strong>Speed</strong> is the rate of distance covered without direction, while <strong>velocity</strong> includes direction.</li>
  <li><strong>Instantaneous velocity</strong> represents a specific moment, whereas <strong>average velocity</strong> is calculated over a period of time.</li>
</ul>

<h3>Lesson 4.2: Final Quiz</h3>
<ol>
  <li>A person walks 10 meters east, then 5 meters west. What is their distance and displacement?
    <ul>
      <li><strong>Distance:</strong> 15 meters</li>
      <li><strong>Displacement:</strong> 5 meters east</li>
    </ul>
  </li>
  <li>If a car travels 100 km in 2 hours, then stops for 30 minutes and travels another 50 km in 1 hour, what is its average speed?
    <ul>
      <li><strong>Average Speed:</strong> 150 km / 3.5 hours = 42.86 km/h</li>
    </ul>
  </li>
</ol>

            
            
          </>
        ),
      },
      {
        title: "Day 2 - Assignment", 
        content: (
            <>
              <h3>Assignment: Understanding Distance and Displacement</h3>
              <p>
                Based on today's lecture, please answer the following question:
              </p>
              <p>
                <strong>Question:</strong> Explain the difference between distance and displacement. Provide an example to illustrate your explanation.
              </p>
        
              {/* User Input Area */}
              <form>
                <textarea
                  placeholder="Type your answer here..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginTop: '10px',
                    fontSize: '16px',
                    resize: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    marginTop: '10px',
                    padding: '10px 15px',
                    background:  '#0c1f4d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Submit
                </button>
              </form>
            </>
          ),
        },,
      ,
      {
        title: "Day 2 - Quiz",
        content: <p>Final content for Day 2, Section 3.</p>,
      },
    ],
  },
  {
    day: "Day 3",
    accordions: [
      {
        title: "Day 3 - Video",
        content: (
          <>
                <h1>Motion with Constant Velocity and Uniform Acceleration</h1>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/P0UYC8S4kUI?si=oiqXEw_qdir_gxDI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>In physics, understanding motion is crucial. We can describe motion using several different tools: velocity, acceleration, position, and time. In this section, we will focus on motion with constant velocity and uniform (constant) acceleration.</p>

<h2>Motion with Constant Velocity</h2>
<p>When an object moves with constant velocity, it means that it covers equal distances in equal time intervals. This means there is no change in the speed or direction of the object. The equation used to describe this type of motion is:</p>

<p><code>v = d / t</code>, where:</p>
<ul>
    <li><strong>v</strong> is the velocity (constant)</li>
    <li><strong>d</strong> is the distance traveled</li>
    <li><strong>t</strong> is the time taken</li>
</ul>

<h2>Motion with Uniform Acceleration</h2>
<p>When an object accelerates uniformly, it means the rate of change of velocity (acceleration) is constant. The following equations describe this motion:</p>
<ul>
    <li><code>v = v<sub>0</sub> + at</code> - Final velocity after time <em>t</em></li>
    <li><code>d = v<sub>0</sub>t + ½at²</code> - Displacement after time <em>t</em></li>
    <li><code>v² = v<sub>0</sub>² + 2ad</code> - Relationship between velocity, displacement, and acceleration</li>
</ul>

<p>Where:</p>
<ul>
    <li><strong>v</strong> is the final velocity</li>
    <li><strong>v<sub>0</sub></strong> is the initial velocity</li>
    <li><strong>a</strong> is the constant acceleration</li>
    <li><strong>d</strong> is the displacement</li>
    <li><strong>t</strong> is the time</li>
</ul>

<h2>Position-Time and Velocity-Time Graphs</h2>
<p>Graphical representation of motion helps us visualize how an object's position and velocity change over time. There are two primary types of graphs we use: Position-Time graphs and Velocity-Time graphs.</p>

<h3>Position-Time Graph</h3>
<p>This graph shows how an object's position changes over time. The slope of the graph tells us the object's velocity.</p>

<p>If the graph is a straight line, the object is moving with a constant velocity. A curved line indicates acceleration.</p>

<h3>Velocity-Time Graph</h3>
<p>This graph shows how an object's velocity changes over time. The slope of the graph represents the object's acceleration.</p>

<p>If the velocity-time graph is a straight horizontal line, the object has constant velocity. If it slopes upward, the object is accelerating, and if it slopes downward, the object is decelerating.</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-Py2zI29THg?si=VeIwMvRvqODYXB2v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<h2>Relationship Between Slope and Velocity/Acceleration</h2>
<p>The slope of a Position-Time graph is directly related to the object's velocity. A steeper slope means a higher velocity, while a flat line means the object is stationary.</p>

<p>On the other hand, the slope of a Velocity-Time graph represents acceleration. A steep slope indicates strong acceleration, while a flat line means no acceleration (constant velocity).</p>

<p>In both graphs, the area under the Velocity-Time curve represents the displacement of the object.</p>

<h2>Summary</h2>
<p>Understanding motion through equations and graphs helps us describe how objects move. With constant velocity, the object's position changes linearly over time. With uniform acceleration, the object’s velocity changes at a constant rate, and the position-time graph becomes curved.</p>

            
          </>
        ),
      },
      {
        title: "Day 3 - Lecture",
        content: <p>More Day 2, Section 2 content here.</p>
        ,
      },
      {
        title: "Day 3 - Assignment",
        content: <p>Final content for Day 2, Section 3.</p>,
      },
    ],
  },
  {
    day: "Day 4",
    accordions: [
      {
        title: "Day 4 - Lecture",
        content: (
          <>
            
          </>
        ),
      },
      {
        title: "Day 4 - Video and Overview",
        content: <>
        <p>Final Review</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/9adNqazSrpQ?si=n6GCjojzc8pIeJH5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            
            </>
      },
      {
        title: "Day 4 - Final Test",
        content:( 
            
            <>
        <p>Final content for Day 2, Section 3.</p>
            <Quiz></Quiz>
            </>
        ),
      },
    ],
  },
  // Add more days as needed
];

const PaginatedAccordion = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const currentDayData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div>
      {currentDayData.map((day, index) => (
        <div key={index}>
          <h2>{day.day}</h2>
          <Accordion allowZeroExpanded>
            {day.accordions.map((accordion, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>{accordion.title}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>{accordion.content}</AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={data.length / itemsPerPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginatedAccordion;
