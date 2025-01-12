// LeetCodeData.js
import React from 'react';
import { FaTrophy, FaBullseye } from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';
import { FaFire } from 'react-icons/fa';
import { GiCrown } from 'react-icons/gi';

const LeetCodeData = ({ userData }) => {

    const ProgressCircle = ({ percentage, color }) => {
        const strokeDasharray = 440; // Circumference of the circle (2 * Math.PI * radius)
        const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;
    
        return (
          <div className="relative w-24 h-24 mx-auto">
            <svg className="absolute top-0 left-0" width="100%" height="100%" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e6e6e6" strokeWidth="12" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke={color}
                strokeWidth="6"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.35s' }}
              />
            </svg>
          </div>
        );
      };


  return (
    <div className="mt-10 ml-36 flex justify-center items-center flex-col ">
      <h1 className='text-white mt-4 font-extrabold text-4xl mb-4'>Leetcode Data</h1>
      <div className="flex flex-wrap justify-start w-full space-x-4">
        {/* Total Solved */}
        <div className="flex flex-row items-center p-6 w-72 h-36 border-2 border-gray-300 rounded-lg shadow-lg">
          <div><FaTrophy style={{ color: 'yellow', fontSize: '60px' }} /></div>
          <div className="flex flex-col ml-4">
            <div className="font-bold text-lg">Total Solved</div>
            <div className="text-xl">{userData.totalSolved}</div>
          </div>
        </div>

        {/* Top Percentage */}
        <div className="flex flex-row items-center p-6 w-72 h-36 border-2 border-gray-300 rounded-lg shadow-lg">
          <div><FaBullseye style={{ color: 'green', fontSize: '60px' }} /></div>
          <div className="flex flex-col ml-4">
            <div className="font-bold text-lg">Top Percentage</div>
            <div className="text-xl">{userData.contestRanking.topPercentage}%</div>
          </div>
        </div>

        {/* Total Badges */}
        <div className="flex flex-row items-center p-6 w-72 h-36 border-2 border-gray-300 rounded-lg shadow-lg">
          <div><IoIosFlash style={{ color: 'yellow', fontSize: '60px' }} /></div>
          <div className="flex flex-col ml-4">
            <div className="font-bold text-lg">Total Badges</div>
            <div className="text-xl">{userData.badges.length}</div>
          </div>
        </div>

        {/* Total Contest */}
        <div className="flex flex-row items-center p-6 w-72 h-36 border-2 border-gray-300 rounded-lg shadow-lg">
          <div><FaFire style={{ color: 'orange', fontSize: '60px' }} /></div>
          <div className="flex flex-col ml-4">
            <div className="font-bold text-lg">Total Contest</div>
            <div className="text-xl">{Math.floor(userData.contestRanking.attendedContestsCount)}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-row items-center p-6 w-72 h-36 border-2 border-gray-300 rounded-lg shadow-lg">
          <div><GiCrown style={{ color: 'gold', fontSize: '60px' }} /></div>
          <div className="flex flex-col ml-4">
            <div className="font-bold text-lg">Rating</div>
            <div className="text-xl">{Math.floor(userData.contestRanking.rating)}</div>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap gap-4 w-full mt-10 ml-40">
  {/* Easy Difficulty */}
  <div className="p-4 animate-border-move text-white rounded-lg border-2 border-gray-300 shadow-lg  flex flex-col justify-between items-center w-full sm:w-1/4 h-48 transition-all hover:shadow-xl hover:scale-105">
    <div>
      <h4 className="text-xl  font-semibold">Easy</h4>
      <p className="text-lg">{userData.easySolved} / {userData.totalEasy}</p>
    </div>
    <ProgressCircle percentage={(userData.easySolved / userData.totalEasy) * 100} color="#4CAF50" />
  </div>

  {/* Medium Difficulty */}
  <div className="p-4 animate-border-move text-white rounded-lg border-2 border-gray-300 shadow-lg flex flex-col justify-between items-center w-full sm:w-1/4 h-48 transition-all hover:shadow-xl hover:scale-105">
    <div>
      <h4 className="text-xl  font-semibold">Medium</h4>
      <p className="text-lg ">{userData.mediumSolved} / {userData.totalMedium}</p>
    </div>
    <ProgressCircle percentage={(userData.mediumSolved / userData.totalMedium) * 100} color="#FFEB3B" />
  </div>

  {/* Hard Difficulty */}
  <div className="p-4 text-white animate-border-move  rounded-lg border-2 border-gray-300 shadow-lg flex flex-col justify-between items-center w-full sm:w-1/4 h-48 transition-all hover:shadow-xl hover:scale-105">
    <div>
      <h4 className=" text-xl font-semibold">Hard</h4>
      <p className="text-lg">{userData.hardSolved} / {userData.totalHard}</p>
    </div>
    <ProgressCircle
      percentage={(userData.hardSolved / userData.totalHard) * 100}
      color="#F44336" // Red color for Hard
    />
  </div>
</div>




    </div>
  );
};

export default LeetCodeData;
