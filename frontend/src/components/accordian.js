import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ReactPaginate from "react-paginate";
import "./accordian.css";
import { LuVideoOff } from "react-icons/lu";

const ITEMS_PER_PAGE = 1;

const AccordionContent = ({ courseData, videoRecommendations }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValue, setInputValue] = useState(""); // State to handle text input
  const [isSubmitted, setIsSubmitted] = useState(false); // State for submission confirmation

  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset the confirmation after 3 seconds
  };

  const formatMessage = (text) => {
    return text
      .replace(/######\s(.+)/g, "<h6>$1</h6>")
      .replace(/#####\s(.+)/g, "<h5>$1</h5>")
      .replace(/####\s(.+)/g, "<h4>$1</h4>")
      .replace(/###\s(.+)/g, "<h3>$1</h3>")
      .replace(/##\s(.+)/g, "<h2>$1</h2>")
      .replace(/#\s(.+)/g, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  };

  const daysArray = courseData?.days ? Object.keys(courseData.days) : [];
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const selectedDays = daysArray.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!courseData || !courseData.days) {
    return <p>No course data available</p>;
  }

  return (
    <div className="coursecontent">
      <Accordion allowMultipleExpanded allowZeroExpanded>
        {selectedDays.map((dayKey, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>{`Day ${startIndex + index + 1}`}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Accordion allowMultipleExpanded allowZeroExpanded>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Lectures</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {courseData?.days[dayKey]?.lectures ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: formatMessage(courseData.days[dayKey].lectures) }}
                      ></div>
                    ) : (
                      <p>No lectures available for this day.</p>
                    )}
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Assignments</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {courseData?.days[dayKey]?.assignments ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: formatMessage(courseData.days[dayKey].assignments) }}
                      ></div>
                    ) : (
                      <p>No assignments available for this day.</p>
                    )}
                    {/* Text input box and submit button for Assignments */}
                    <div className="input-container">
                      <label htmlFor={`assignmentInput-${index}`}>Respond Be:</label>
                      <input
                        id={`assignmentInput-${index}`}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your response here..."
                      />
                      <button onClick={handleSubmit} className="submit-button">
                        Submit
                      </button>
                      {isSubmitted && <p className="success-message">Your response has been submitted!</p>}
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Quizzes</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {courseData?.days[dayKey]?.quizzes ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: formatMessage(courseData.days[dayKey].quizzes) }}
                      ></div>
                    ) : (
                      <p>No quizzes available for this day.</p>
                    )}
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
              <h2>Recommended Videos</h2>
              {videoRecommendations && videoRecommendations.length > 0 ? (
                <div className="video-recommendations">
                  <ul>
                    {videoRecommendations.map((video, index) => (
                      <li key={index} className="video-item">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                          <p className="video-title">{video.title}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p><LuVideoOff /> Unfortunately there are no video recommendations for this course </p>
              )}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(daysArray.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default AccordionContent;
