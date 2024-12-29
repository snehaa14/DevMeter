import React from 'react';

const Card = ({ index, animationStarted, title, description }) => {
  const transforms = [
    'rotate(-3deg)', 
    'translateY(-240px)', 
    'translateY(-480px)', 
    'translateY(-710px)'
  ];

  const transformStyle = animationStarted ? transforms[index] : 'translateY(0)';
  const transitionDuration = animationStarted ? '4s' : '0.5s'; // Adjust transition duration when not animating

  return (
    <div
      className={`w-[90%] h-[200px] ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-500'} shadow-lg flex relative`}
      style={{
        transform: transformStyle,
        transition: `transform ${transitionDuration} ease`, // Smooth transition
        zIndex: animationStarted ? 10 : 0,
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-lg">
        <div className="text-3xl font-bold">{title}</div>
        <div className="ml-3 text-xl text-gray-700">{description}</div>
      </div>

      {/* "01" at the right corner */}
      <div className="absolute right-4 top-4 text-5xl font-bold">{`0${index + 1}`}</div>
    </div>
  );
};

export default Card;
