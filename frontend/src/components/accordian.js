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
        title: "Day 1 - Section 1",
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
        title: "Day 1 - Section 2",
        content: (
          <>
            <p>This is another content section for Day 1, Section 2.</p>
            <img src="https://via.placeholder.com/150" alt="Placeholder" />
          </>
        ),
      },
      {
        title: "Day 1 - Section 3",
        content: (
          <>
            <p>More content for Day 1, Section 3.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    day: "Day 2",
    accordions: [
      {
        title: "Day 2 - Section 1",
        content: (
          <>
            <p>Content for Day 2, Section 1.</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZJm3USqDM1Q"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ),
      },
      {
        title: "Day 2 - Section 2",
        content: <p>More Day 2, Section 2 content here.</p>,
      },
      {
        title: "Day 2 - Section 3",
        content: <p>Final content for Day 2, Section 3.</p>,
      },
    ],
  },
  {
    day: "Day 3",
    accordions: [
      {
        title: "Day 3 - Section 1",
        content: (
          <>
            <p>Content for Day 3, Section 1.</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZJm3USqDM1Q"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ),
      },
      {
        title: "Day 3 - Section 2",
        content: <p>More Day 2, Section 2 content here.</p>,
      },
      {
        title: "Day 3 - Section 3",
        content: <p>Final content for Day 2, Section 3.</p>,
      },
    ],
  },
  {
    day: "Day 4",
    accordions: [
      {
        title: "Day 4 - Learn ",
        content: (
          <>
            <p>Content for Day 2, Section 1.</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZJm3USqDM1Q"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        ),
      },
      {
        title: "Day 4 - video and overview",
        content: <p>More Day 2, Section 2 content here.</p>,
      },
      {
        title: "Day 4 - Final review",
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
