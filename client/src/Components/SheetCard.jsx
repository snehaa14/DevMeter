import React from 'react';

const SheetCard = ({ title, percentage, description, total, status, onFollowToggle, onCardClick }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg max-w-xs cursor-pointer" onClick={onCardClick}>
      {/* Title and Percentage in one line */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-xl">{title}</span>
        <span>{percentage}%</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Total Questions and Follow button in the last line */}
      <div className="flex justify-between items-center mt-4">
        <span>Total Questions: {total}</span>
        <button 
          onClick={onFollowToggle}  // Toggle Follow status
          className={`px-6 py-2 border rounded-md ${status === 'Following' ? 'font-bold text-red-500' : ''}`}>
          {status}
        </button>
      </div>
    </div>
  );
};

export default SheetCard;
