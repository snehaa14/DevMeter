import React from 'react';
import image1 from '../assets/images/photo3.jpg'

const Section1 = () => {
  return (
    <div className="w-full flex items-center justify-between p-8 mt-32 mb-28">
      {/* Left Section: Image */}
      <div className="w-1/3">
        <img
          src={image1} // Replace with your image source
          alt="Large Visual"
          className="w-full h-[500px] object-contain rounded-lg shadow-lg" // Set height to 300px (adjust as needed)
        />
      </div>

      {/* Right Section: Text */}
      <div className="w-2/3 pl-8">
  {/* Main Heading */}
  <div className="text-4xl font-extrabold mb-6 text-red-600">
    Coding Platform 
  </div>
  <div className="text-4xl font-extrabold mb-6 text-red-600">
     Performance Tracker
  </div>
  
  {/* Supporting Paragraph */}
  <p className="text-3xl text-gray-600 leading-relaxed mb-8">
    Stay on top of performance metrics for various coding platforms to ensure you are always making informed decisions.
  </p>

  {/* Subheading */}
  <div className="text-4xl mb-4 text-red-600 font-extrabold">
    Different Coding Sheets
  </div>
  
  {/* Supporting Paragraph */}
  <p className="text-3xl  text-gray-600 leading-relaxed">
    Explore a wide variety of coding sheets available to enhance your learning and problem-solving skills.
  </p>
</div>

    </div>
  );
};

export default Section1;
