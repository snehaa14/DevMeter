// Components/CodeChefData.js
import React from 'react';
import { FaUserCircle, FaStar, FaTrophy, FaMedal } from 'react-icons/fa';  // Importing icons
import CodeChefGraph from './CodeChefGraph'

const CodeChefData = ({ codechefData }) => {
  return (
    <div className="mt-20">
      <div className="flex justify-center items-center mt-4 mb-7">
        <h2 className="text-white font-extrabold text-3xl mb-6">CodeChef Profile Data</h2>
      </div>

      <div className="flex justify-center items-center mx-8 gap-4 space-x-2"> {/* Reduced space between items */}

        {/* Profile Card */}
        <div className="flex flex-row items-center p-4 w-72 h-40 border-2 border-gray-300 rounded-lg shadow-lg ">
          <FaUserCircle className="text-4xl text-blue-500 mr-2" /> {/* Reduced icon size */}
          <div className="text-center ml-3">
            <h3 className="text-white text-xl font-semibold">{codechefData.name}</h3>
            <p className="text-gray-300 text-sm mt-1">Profile</p>
          </div>
        </div>

        {/* Current and Highest Rating Card */} 
        <div className="flex flex-row items-center p-4 w-72 h-40 border-2 border-gray-300 rounded-lg shadow-lg">
          <FaTrophy className="text-4xl text-yellow-400 mr-2" /> {/* Reduced icon size */}
          <div className="text-center ml-4">
            <h3 className="text-white text-xl font-semibold mb-1">Rating</h3>
            <p className="text-gray-300 text-sm">Current Rating: <span className='text-xl'>{codechefData.currentRating}</span></p>
            <p className="text-gray-300 text-sm">Highest Rating: <span className='text-xl'>{codechefData.highestRating}</span></p>
          </div>
        </div>

        {/* Global and Country Rank Card */}
        <div className="flex flex-row items-center p-4 w-72 h-40 border-2 border-gray-300 rounded-lg shadow-lg ">
          <FaMedal className="text-4xl text-red-500 mr-2" /> {/* Reduced icon size */}
          <div className="text-center">
            <h3 className="text-white text-2xl mb-3 font-semibold">Ranks</h3>
            <p className="text-gray-300 text-sm">Global Rank: <span className='text-xl'>{codechefData.globalRank}</span></p>
            <p className="text-gray-300 text-sm">Country Rank: <span className='text-xl'>{codechefData.countryRank}</span> ({codechefData.countryName})</p>
          </div>
        </div>

        {/* Star Rating Card */}
        <div className="flex flex-row items-center p-4 w-72 h-40 border-2 border-gray-300 rounded-lg shadow-lg ">
          <FaStar className="text-4xl text-green-400 mr-2" /> {/* Reduced icon size */}
          <div className="text-center ml-4">
            <h3 className="text-white text-2xl font-semibold">Stars</h3>
            <p className="text-gray-300 text-xl mt-2">
              {Array(parseInt(codechefData.stars))
                .fill('⭐')
                .map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
            </p>
          </div>
        </div>

      </div>

                <CodeChefGraph ratingData={codechefData.ratingData} data={codechefData}/>
                
    </div>
  );
};

export default CodeChefData;
