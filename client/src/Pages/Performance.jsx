// Performance.js
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Button from '../Components/Button';
import axios from 'axios';
import LeetCodeData from '../Components/LeetCodeData';

function Performance() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setUsername(e.target.value);

  const handleLeetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username) {
      try {
        console.log('username:', username);
        const response = await axios.get(`http://localhost:5000/leetcode/${username}`);
        setUserData(response.data);
        console.log('userData:', response.data);
        setError(null);
        setSubmitted(true);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data, please try again');
        setUserData(null);
        setSubmitted(false);
        setLoading(false);
      }
    }
  };



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
    <div className="w-full h-full relative pt-20 mt-36"> {/* Add padding to avoid overlap */}
      <Navbar />
      <form onSubmit={handleLeetSubmit} className="absolute top-0 right-0 mt-4 mr-4 flex items-center space-x-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="username" className="text-sm font-medium text-white">LeetCode Username</label>
          <input  type="text"   id="username"  name="username"  value={username}    onChange={handleChange}   placeholder="Enter your LeetCode username"  
            className=" mb-1 p-2 w-48 border text-black font-bold border-gray-300 rounded-md focus:outline-none focus:ring-2"  />
        </div>
        <Button type="primary" text="Submit" className="w-auto" />
      </form>
      {loading && <div className="text-white mt-4">Loading...</div>}
      {submitted && !loading && userData && <LeetCodeData userData={userData} />}
      {error && <div className="mt-6 text-red-500">{error}</div>}
    </div>
  );
}

export default Performance;
