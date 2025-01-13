import React from 'react';

const SheetCard = ({ title, percentage, description, total, status, onFollowToggle, onCardClick }) => {
  return (
    <div 
      className="bg-white/10 animate-border-move backdrop-blur-lg border border-white/30 rounded-lg p-6 shadow-xl max-w-xs cursor-pointer transition-all hover:shadow-2xl"
      onClick={onCardClick}
      style={{
        background: 'rgba(255, 255, 255, 0.15)',   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',   border: '1px solid rgba(255, 255, 255, 0.3)',  // semi-transparent border
        backdropFilter: 'blur(10px)',  minHeight: '300px',  display: 'flex', flexDirection: 'column',  justifyContent: 'space-between',
      }}
    >
      {/* Title and Percentage in one line */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-xl text-white">{title}</span>
        <span className="text-white">{percentage}%</span>
      </div>

      {/* Description */}
      <p className="text-gray-200 mb-4">{description}</p>

      {/* Total Questions and Follow button in the last line */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-200">Total Questions: {total}</span>
        <button  onClick={onFollowToggle} className={`px-6 py-2 border border-white/30 rounded-md transition-all ${status === 'Following' ? 'bg-red-500 text-white font-bold' : 'bg-white/20 text-white'}`}>
          {status}
        </button>
      </div>
    </div>
  );
};

export default SheetCard;
