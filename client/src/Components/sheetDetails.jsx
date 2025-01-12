import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

// Sheet data as JSON
const sheetData = {
  "Striver SDE Sheet": {
    "title": "Striver SDE Sheet",
    "description": "SDE Sheet contains hand-picked top coding interview questions from different topics of Data Structures & Algorithms.",
    "total": 191,
    "topics": [
      {
        "topicTitle": "Arrays and Strings",
        "subtopics": [
          {
            "subtopicTitle": "Basic Array Problems",
            "questions": [
              { "id": 1, "title": "Find the duplicate number", "link": "https://leetcode.com/problems/find-the-duplicate-number/" },
              { "id": 2, "title": "Merge Intervals", "link": "https://leetcode.com/problems/merge-intervals/" }
            ]
          },
          {
            "subtopicTitle": "Advanced Array Problems",
            "questions": [
              { "id": 3, "title": "Next Permutation", "link": "https://leetcode.com/problems/next-permutation/" },
              { "id": 4, "title": "Trapping Rain Water", "link": "https://leetcode.com/problems/trapping-rain-water/" }
            ]
          }
        ]
      },
      {
        "topicTitle": "Linked Lists",
        "subtopics": [
          {
            "subtopicTitle": "Basic Linked List Problems",
            "questions": [
              { "id": 5, "title": "Reverse a Linked List", "link": "https://leetcode.com/problems/reverse-linked-list/" },
              { "id": 6, "title": "Detect Cycle in a Linked List", "link": "https://leetcode.com/problems/linked-list-cycle/" }
            ]
          }
        ]
      }
    ]
  },
  "Love Babbar DSA Sheet": {
    "title": "Love Babbar DSA Sheet",
    "description": "A comprehensive sheet covering all essential DSA problems.",
    "total": 450,
    "topics": [
      {
        "topicTitle": "Arrays",
        "subtopics": [
          {
            "subtopicTitle": "Array Basics",
            "questions": [
              { "id": 1, "title": "Reverse the array", "link": "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/" },
              { "id": 2, "title": "Find the maximum and minimum element in an array", "link": "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/" }
            ]
          }
        ]
      }
    ]
  },
  "NeetCode 150": {
    "title": "NeetCode 150",
    "description": "Popular coding interview problems from NeetCode.",
    "total": 150,
    "topics": [
      {
        "topicTitle": "Dynamic Programming",
        "subtopics": [
          {
            "subtopicTitle": "Easy DP Problems",
            "questions": [
              { "id": 1, "title": "Climbing Stairs", "link": "https://leetcode.com/problems/climbing-stairs/" },
              { "id": 2, "title": "House Robber", "link": "https://leetcode.com/problems/house-robber/" }
            ]
          }
        ]
      }
    ]
  }
};

const SheetDetail = () => {
  const { id } = useParams(); // Get id from the URL
  const [sheet, setSheet] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({}); // Track expanded topics
  const [expandedSubtopics, setExpandedSubtopics] = useState({}); // Track expanded subtopics
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    // Set sheet data based on the id from URL
    setSheet(sheetData[id]);
  }, [id]);

  if (!sheet) {
    return <div>Loading...</div>;
  }

  // Toggle topic expansion
  const toggleTopic = (topicIndex) => {
    setExpandedTopics((prevExpandedTopics) => ({
      ...prevExpandedTopics,
      [topicIndex]: !prevExpandedTopics[topicIndex]
    }));
  };

  // Toggle subtopic expansion
  const toggleSubtopic = (topicIndex, subtopicIndex) => {
    setExpandedSubtopics((prevExpandedSubtopics) => ({
      ...prevExpandedSubtopics,
      [`${topicIndex}-${subtopicIndex}`]: !prevExpandedSubtopics[`${topicIndex}-${subtopicIndex}`]
    }));
  };

  const handleFollowClick = () => {
    setIsFollowed((prevIsFollowed) => !prevIsFollowed);
  };

  // Calculate total solved questions for the progress circle
  const solvedQuestions = Math.floor(Math.random() * sheet.total); // Random solved count
  const unsolvedQuestions = sheet.total - solvedQuestions;
  const solvedPercentage = (solvedQuestions / sheet.total) * 100;

  // Calculate stroke-dasharray and stroke-dashoffset for the circular progress
  const strokeDasharray = 2 * Math.PI * 50; // Circumference of circle (radius 50)
  const strokeDashoffset = strokeDasharray - (solvedPercentage / 100) * strokeDasharray;

  return (
    <div className="container w-full h-full mt-60">
      <Navbar /> {/* Navbar is placed at the top */}
      
      <div className="flex mt-0 top-0 left-0 border-gray-300 rounded-lg p-8 shadow-2xl mb-10">
        {/* Left side: Sidebar with topics and subtopics */}
        
        {/* Right side: Sheet details with Circular Progress Bar */}
        <div className="w-2/3 ml-8">
          <h1 className="text-4xl font-bold">{sheet.title}</h1>
          <p className="mt-4">{sheet.description}</p>

          <div className="mt-4">
            <p>Total Questions: {sheet.total}</p>
            <p>Solved Questions: {solvedQuestions}</p>
            <p>Unsolved Questions: {unsolvedQuestions}</p>
          </div>

          {/* Follow/Unfollow Button */}
          <button
            onClick={handleFollowClick}
            className={`mt-4 px-4 py-2 text-white font-bold rounded-md ${
              isFollowed ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>

          
        </div>


        {/* Circular Progress Bar */}
        <div className="w-1/3  flex justify-center items-center mt-8">
            <div className="relative">
              {/* Circular Progress Bar */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#dcdcdc" strokeWidth="10" fill="none" />
                <circle
                  cx="60" cy="60" r="50"
                  stroke="#4caf50" strokeWidth="10" fill="none"
                  strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              {/* Display progress percentage */}
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xl font-semibold text-green-500">
                {Math.round(solvedPercentage)}%
              </div>
            </div>

            <div className="mt-6 text-center flex flex-col items-center gap-4 ml-4">
          <div className='bg-gray-400 rounded-md'><p>Solved Questions: {solvedQuestions}</p></div>
          <div className='bg-gray-400 rounded-md'><p>Unsolved Questions: {unsolvedQuestions}</p></div>
          <div className='bg-gray-400 rounded-md'><p>Total Questions: {sheet.total}</p></div>
          
          
        </div>
          </div>


    
      </div>


      <div className="w-full bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Topics</h2>
          {sheet.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="mb-4">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="text-xl font-semibold w-full text-left p-2 bg-blue-500 text-white rounded-md"
              >
                {topic.topicTitle}
              </button>

              {expandedTopics[topicIndex] && (
                <div className="mt-2 ml-4">
                  {topic.subtopics.map((subtopic, subtopicIndex) => (
                    <div key={subtopicIndex}>
                      <button
                        onClick={() => toggleSubtopic(topicIndex, subtopicIndex)}
                        className="text-lg font-medium w-full text-left p-1 bg-blue-200 text-black rounded-md"
                      >
                        {subtopic.subtopicTitle}
                      </button>

                      {expandedSubtopics[`${topicIndex}-${subtopicIndex}`] && (
                        <ul className="ml-4 mt-2 list-disc list-inside">
                          {subtopic.questions.map((question) => (
                            <li key={question.id} className="mt-1">
                              <a
                                href={question.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {question.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

    </div>
  );
};

export default SheetDetail;
