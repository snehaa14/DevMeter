import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../Components/Navbar';
import SheetCard from '../Components/SheetCard';

const sheetData = [
  {
    title: "Striver SDE Sheet",
    percentage: 0,
    description: "SDE Sheet contains very handily crafted and picked top coding questions that cover all important concepts.",
    total: 191,
    status: "Follow",
    id: "Striver SDE Sheet" // Use title as the unique id
  },
  {
    title: "Love Babbar DSA Sheet",
    percentage: 0,
    description: "This sheet is designed by Love Babbar, focusing on mastering the most important coding interview problems.",
    total: 450,
    status: "Follow",
    id: "Love Babbar DSA Sheet" // Use title as the unique id
  },
  {
    title: "NeetCode 150",
    percentage: 0,
    description: "NeetCode's sheet covers 150 essential coding interview questions curated to help crack interviews.",
    total: 150,
    status: "Follow",
    id: "NeetCode 150" // Use title as the unique id
  },
  // Add `title` as `id` for other sheets similarly
];

const Sheets = () => {
  const [status, setStatus] = useState(sheetData);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFollowToggle = (index) => {
    const updatedStatus = [...status];
    const currentSheet = updatedStatus[index];
    currentSheet.status = currentSheet.status === "Follow" ? "Following" : "Follow";
    setStatus(updatedStatus);
  };

  const handleCardClick = (id, status) => {
    // Navigate to a new page with both the id and status in the URL
    navigate(`/sheet/${id}/${status}`);
  };

  return (
    <div className='w-[100%] h-[100%]'> 
      <Navbar />
      <div className="text-center font-bold text-4xl mt-2 mb-16">Popular sheets</div>

      <div className='flex flex-row flex-wrap gap-10 items-center justify-center'>
        {status.map((sheet, index) => (
          <SheetCard 
            key={index}
            title={sheet.title}
            percentage={sheet.percentage}
            description={sheet.description}
            total={sheet.total}
            status={sheet.status}
            onFollowToggle={() => handleFollowToggle(index)}
            onCardClick={() => handleCardClick(sheet.id, sheet.status)} // Pass both id and status
          />
        ))}    
      </div>
    </div>
  );
}

export default Sheets;
