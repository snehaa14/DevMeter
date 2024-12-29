import React, { useEffect, useState } from 'react';

// Import images up to Pic16
import Pic1 from '../assets/images/slider/Pic 1.jpg';
import Pic2 from '../assets/images/slider/Pic2.jpg';
import Pic3 from '../assets/images/slider/Pic3.jpg';
import Pic4 from '../assets/images/slider/Pic4.jpg';
import Pic5 from '../assets/images/slider/Pic5.jpg';
import Pic6 from '../assets/images/slider/Pic6.jpg';
import Pic7 from '../assets/images/slider/Pic7.jpg';
import Pic8 from '../assets/images/slider/Pic8.jpg';
import Pic9 from '../assets/images/slider/Pic9.jpg';
import Pic10 from '../assets/images/slider/Pic10.jpg';
import Pic11 from '../assets/images/slider/Pic11.jpg';
import Pic12 from '../assets/images/slider/Pic12.jpg';
import Pic13 from '../assets/images/slider/Pic13.jpg';
import Pic14 from '../assets/images/slider/Pic14.jpg';
import Pic15 from '../assets/images/slider/Pic15.jpg';
import Pic16 from '../assets/images/slider/Pic16.jpg';



const ImageSlider = () => {
  const [leftImages, setLeftImages] = useState([Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8]);
  const [rightImages, setRightImages] = useState([Pic9, Pic10, Pic11, Pic12, Pic13, Pic14, Pic15, Pic16]);

  // Effect to trigger the movement every 5 seconds for the first div (left move)
  useEffect(() => {
    const leftTimer = setInterval(() => {
      setLeftImages((prev) => {
        const newImages = [...prev];
        newImages.push(newImages.shift()); // Move first image to the end
        return newImages;
      });
    }, 5000); // Trigger every 5 seconds

    const rightTimer = setInterval(() => {
      setRightImages((prev) => {
        const newImages = [...prev];
        newImages.unshift(newImages.pop()); // Move last image to the start
        return newImages;
      });
    }, 5000); // Trigger every 5 seconds

    // Cleanup on component unmount
    return () => {
      clearInterval(leftTimer);
      clearInterval(rightTimer);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden mb-20 mt-9 flex flex-col justify-center items-center">
      {/* First div for images moving left */}
      <div className="flex transition-all duration-1000 ease-in-out w-full gap-5 mb-8 overflow-hidden">
        <div className="flex transform transition-all duration-1000 ease-in-out">
          {leftImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Pic ${index + 1}`}
              className="w-[350px] h-[350px] object-cover transform transition-all duration-1000 ease-in-out hover:scale-105 hover:opacity-90"
            />
          ))}
        </div>
      </div>

      {/* Second div for images moving right */}
      <div className="flex transition-all duration-1000 ease-in-out w-full gap-5 mb-8 overflow-hidden">
        <div className="flex transform transition-all duration-1000 ease-in-out">
          {rightImages.map((image, index) => (
            <img
              key={index + 8}
              src={image}
              alt={`Pic ${index + 9}`}
              className="w-[350px] h-[350px] object-cover transform transition-all duration-1000 ease-in-out hover:scale-105 hover:opacity-90"
            />
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default ImageSlider;
