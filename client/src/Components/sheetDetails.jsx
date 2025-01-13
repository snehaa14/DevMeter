

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SheetDetail = () => {
  const { id, status } = useParams(); // Get id and status from the URL
  const navigate = useNavigate(); // To handle navigation (e.g., after follow/unfollow)

  const [sheet, setSheet] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false); // Track follow status

  // States for tracking active topics and subtopics independently
  const [activeTopics, setActiveTopics] = useState([]);
  const [activeSubtopics, setActiveSubtopics] = useState([]);

  useEffect(() => {
    // Fetch data from the sheets.json file (make sure it's available in the public folder)
    fetch('/sheets.json')
      .then((response) => response.json())
      .then((data) => {
        const fetchedSheet = data[id]; // Get the sheet data based on the ID
        if (fetchedSheet) {
          setSheet(fetchedSheet);
          setIsFollowed(status === 'follow'); // Set follow state based on the status in the URL
        } else {
          console.error('Sheet not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching sheet data:', error);
      });
  }, [id, status]); // Re-run effect if `id` or `status` changes

  // Circular progress calculation
// Conditional check to ensure `sheet` is loaded
const solvedQuestions = sheet ? Math.floor(Math.random() * sheet.total) : 0;
const unsolvedQuestions = sheet ? sheet.total - solvedQuestions : 0;
const solvedPercentage = sheet ? (solvedQuestions / sheet.total) * 100 : 0;
const strokeDasharray = 2 * Math.PI * 50; // Circumference of circle (radius 50)
const strokeDashoffset = sheet ? strokeDasharray - (solvedPercentage / 100) * strokeDasharray : strokeDasharray;


  const handleFollowClick = () => {
    setIsFollowed((prevState) => !prevState); // Toggle follow/unfollow
    // Update the URL with the follow/unfollow action
    if (!isFollowed) {
      navigate(`/sheet/${id}/follow`); // Navigate to follow
    } else {
      navigate(`/sheet/${id}/unfollow`); // Navigate to unfollow
    }
  };

  const toggleTopic = (index) => {
    setActiveTopics((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Close the topic if it's already open
      } else {
        return [...prev, index]; // Open the topic if it's closed
      }
    });
  };

  const toggleSubtopic = (topicIndex, subtopicIndex) => {
    setActiveSubtopics((prev) => {
      const key = `${topicIndex}-${subtopicIndex}`;
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key); // Close the subtopic if it's already open
      } else {
        return [...prev, key]; // Open the subtopic if it's closed
      }
    });
  };

  if (!sheet) {
    return <div>Loading...</div>;
  }

  // Check if topics exist or just display questions
  const hasTopics = sheet.topics && sheet.topics.length > 0;

  return (
    <div className="container w-full h-full mt-40">
      <Navbar />
      <div className="flex mt-0 top-0 left-0 border-white rounded-lg p-8 shadow-2xl mb-10">
        <div className="w-full ml-8 backdrop-blur-lg bg-white/30 border border-white/20 shadow-lg rounded-xl p-6">
          <h1 className="text-4xl font-bold">{sheet.title}</h1>
          <p className="mt-4">{sheet.description}</p>
          <p>Total Questions: {sheet.total}</p>

          {/* Follow Button */}
          <button
            onClick={handleFollowClick}
            className={`mt-4 px-4 py-2 text-white font-bold rounded-md ${isFollowed ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>


          {/* Circular Progress Bar */}
        <div className="w-1/3 flex justify-center items-center mt-8">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#dcdcdc" strokeWidth="10" fill="none" />
              <circle
                cx="60" cy="60" r="50"
                stroke="#4caf50" strokeWidth="10" fill="none"
                strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xl font-semibold text-green-500">
              {Math.round(solvedPercentage)}%
            </div>
          </div>
        </div>



        </div>

        
      </div>

      {/* Topics or Questions Display */}
      <div className="w-full p-4 rounded-md">
        {hasTopics ? (
          sheet.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
              <h3
                className={`text-xl font-semibold cursor-pointer transition-all duration-300 ${activeTopics.includes(topicIndex) ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500`}
                onClick={() => toggleTopic(topicIndex)} // Toggle topic visibility
              >
                {topic.topicTitle}
              </h3>

              {/* Topic Content */}
              <div
                className={`transition-all duration-500 overflow-hidden ${activeTopics.includes(topicIndex) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ transitionProperty: 'max-height, opacity' }}
              >
                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex} className="bg-gray-50 rounded-lg p-4 mb-4 shadow-md">
                    <h4
                      className={`text-lg font-medium cursor-pointer transition-all duration-300 ${activeSubtopics.includes(`${topicIndex}-${subtopicIndex}`) ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500`}
                      onClick={() => toggleSubtopic(topicIndex, subtopicIndex)} // Toggle subtopic visibility
                    >
                      {subtopic.subtopicTitle}
                    </h4>

                    {/* Subtopic Content */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${activeSubtopics.includes(`${topicIndex}-${subtopicIndex}`) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                      style={{ transitionProperty: 'max-height, opacity' }}
                    >
                      <ul>
                        {subtopic.questions.map((question) => (
                          <li key={question.id} className="bg-gray-200 rounded-lg p-2 mb-2 shadow-md hover:bg-blue-50">
                            <a
                              href={question.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {question.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // If no topics, display questions directly
          <div>
            <h3 className="text-xl font-semibold">Questions</h3>
            <ul>
              {sheet.questions.map((question) => (
                <li key={question.id} className="bg-gray-200 rounded-lg p-2 mb-2 shadow-md hover:bg-blue-50">
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {question.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetDetail;
