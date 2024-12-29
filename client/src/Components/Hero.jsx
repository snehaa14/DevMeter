import React from 'react';
import Button from './Button';  // Assuming you have this button component
import ImageSlider from './ImageSlider';  // Correctly imported ImageSlider
const Hero = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center mt-72">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Track Coding Platform Performance</h1>
        <p className="text-lg text-gray-700 mb-6">Stay updated with real-time data on various coding platforms to make informed decisions.</p>
      </div>
      
      {/* Button section */}
      <div className="flex justify-center items-center mt-1 space-x-6">  
        {/* Primary Button */}
        <Button text="Get Started" type="primary" />
        
        {/* Secondary Button */}
        <Button text="Learn More" type="secondary" />
      </div>

      {/* Image Slider Component */}
      <div className="mt-12 w-full flex justify-center items-center">
      <ImageSlider />  
    </div>


      
    </div>
  );
}

export default Hero;
