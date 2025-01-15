import React from 'react';
import { AiFillStar, AiFillTrophy, AiFillFire, AiFillCode } from 'react-icons/ai'; // import icons
import { Line } from 'react-chartjs-2'; // Import the Line chart from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import dayjs from 'dayjs'; // Import dayjs to format the date

// Register chart components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const CodeforcesData = ({ codeforcesData }) => {
  // Extract the userRating data
  const userRatings = codeforcesData.codeforcesData.userRating;

  // Extract labels (dates), data (newRating), and contest names from userRating array
  const labels = userRatings.map((contest) => dayjs(contest.ratingUpdateTimeSeconds * 1000).format('YYYY-MM-DD'));  // Convert timestamp to date
  const data = userRatings.map((contest) => contest.newRating);  // Use newRating for the y-axis
  const contestNames = userRatings.map((contest) => contest.contestName);  // Assuming contestName exists in the data
  const ranks = userRatings.map((contest) => contest.rank); // Assuming rank exists in the data

  // Chart data configuration
  const chartData = {
    labels: labels,  // Dates as the x-axis labels
    datasets: [
      {
        label: 'New Rating over Time',  // Line label
        data: data,  // New Ratings for the y-axis
        fill: false,
        borderColor: '#FF1493',  // Set the line color to pink
        pointBorderColor: '#FF1493',  // Set the point color to pink
        tension: 0.1,
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Codeforces Rating ',
      },
      tooltip: {
        callbacks: {
          // Display contest name at the top
          label: function(tooltipItem) {
            const index = tooltipItem.dataIndex; // Get the index of the hovered data point
            const contestName = contestNames[index]; // Get the contest name
            const newRating = tooltipItem.raw; // Get the newRating value
            return `${contestName}\nNew Rating: ${newRating}`;
          },
          // Display rank at the bottom of the tooltip
          afterLabel: function(tooltipItem) {
            const index = tooltipItem.dataIndex; // Get the index of the hovered data point
            const rank = ranks[index]; // Get the rank value
            return `Rank: ${rank}`; // Display the rank below the new rating
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 90,
        },
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'New Rating',
        },
        beginAtZero: false,
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
      },
    },
    backgroundColor: 'white',  // Set the background color of the chart to white
  };

  return (
    <div className='flex justify-center flex-col items-center mb-10 mt-5'>
      <h1 className='text-4xl font-bold mt-4 mb-4'>Codeforces Data</h1> {/* Heading at the top */}
      
      <div className="flex flex-wrap justify-center w-full space-x-4 mt-10 mb-10">
        {/* Max Rank Card */}
        <div className="flex flex-row items-center p-6 w-64 h-36 border-2 border-gray-300 text-white rounded-lg shadow-lg transform hover:bg-gray-100 transition-all duration-300 ease-in-out hover:text-black">
          {/* Icon on the left */}
          <AiFillStar size={120} color="#FFD700" className="mr-4" /> {/* Big and colorful icon */}
          
          {/* Content on the right */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold ">Max Rank</h2> {/* Heading */}
            <div className="text-2xl font-semibold ">{`${codeforcesData.codeforcesData.userInfo.maxRank}`}</div> {/* Data */}
          </div>
        </div>
    
        {/* Max Rating Card */}
        <div className="flex flex-row items-center p-6 w-64 h-36 border-2 border-gray-300 text-white rounded-lg shadow-lg transform hover:bg-gray-100 transition-all duration-300 ease-in-out hover:text-black">
          {/* Icon on the left */}
          <AiFillTrophy size={120} color="#C0C0C0" className="mr-4" /> {/* Big and colorful icon */}
          
          {/* Content on the right */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold ">Max Rating</h2> {/* Heading */}
            <div className="text-2xl font-semibold ">{`${codeforcesData.codeforcesData.userInfo.maxRating}`}</div> {/* Data */}
          </div>
        </div>
    
        {/* Rank Card */}
        <div className="flex flex-row items-center p-6 w-64 h-36 border-2 border-gray-300 text-white rounded-lg shadow-lg transform hover:bg-gray-100 transition-all duration-300 ease-in-out hover:text-black">
          {/* Icon on the left */}
          <AiFillFire size={120} color="#FF4500" className="mr-4" /> {/* Big and colorful icon */}
          
          {/* Content on the right */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold ">Rank</h2> {/* Heading */}
            <div className="text-2xl font-semibold ">{`${codeforcesData.codeforcesData.userInfo.rank}`}</div> {/* Data */}
          </div>
        </div>
    
        {/* Contests Card */}
        <div className="flex flex-row items-center p-6 w-64 h-36 border-2 border-gray-300 text-white rounded-lg shadow-lg transform hover:bg-gray-100 transition-all duration-300 ease-in-out hover:text-black">
          {/* Icon on the left */}
          <AiFillCode size={120} color="#4CAF50" className="mr-4" /> {/* Big and colorful icon */}
          
          {/* Content on the right */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold ">Contests</h2> {/* Heading */}
            <div className="text-2xl font-semibold ">{`${codeforcesData.codeforcesData.userRating.length}`}</div> {/* Data */}
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div style={{ width: '38%', height: '350px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' , marginTop:'40px' , marginBottom:'40px'}}>
        <Line data={chartData} options={chartOptions} /> {/* Render the Line chart here */}
      </div>
    </div>
  );
};

export default CodeforcesData;
