import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Button from './Button';
import Section1 from './Section1';
import TrackPerformance from './TrackPerformance';
const Home = () => {
  return (
    <div className="bg-white w-[100%] h-[100%] mt-8">  {/* Added background color and width */}
      <Navbar />
      <Hero className="pt-20" />  {/* Added padding-top */}
      <Section1 />
    <TrackPerformance />
    </div>
  );
};

export default Home;
