import React from 'react';
import Button from './Button';

const TrackPerformance = () => {
  return (
    <div className="w-full h-[400px] mb-96 relative flex justify-center items-center">
      {/* Outer shadow box (rotating in the opposite direction) */}
      <div className="absolute h-[90%] w-[90%] bg-gray-500 rounded-lg shadow-lg transform transition-transform duration-500 hover:rotate-2"></div>

      {/* Main content box (rotating slightly on hover) */}
      <div className="relative h-[90%] w-[90%] bg-gray-400 rounded-lg shadow-md flex items-center justify-center gap-16 transform transition-transform duration-500 hover:-rotate-2 z-10">
        <div className="flex flex-col gap-14">
          <div className="text-black text-4xl font-bold text-center"> Track Your Performance </div>
          <div className="text-black text-lg font-medium text-center"> Stay updated with the latest performance metrics of various coding platforms. </div>
        </div>

        <Button text="Explore Now" type="primary" />
      </div>
    </div>
  );
};

export default TrackPerformance;
