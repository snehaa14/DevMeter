import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../Components/Navbar';
import SheetCard from '../Components/SheetCard';

const Sheets = () => {
  const [sheetData, setSheetData] = useState([]); // Initialize state with an empty array
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch data from sheets.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sheets.json'); // Fetch the JSON file
        const data = await response.json(); // Parse the JSON
        console.log("Data fetched:", data);

        // Convert the object to an array
        const sheetsArray = Object.values(data); // Extract the values (sheet details) into an array
        setSheetData(sheetsArray); // Set the array in state
      } catch (error) {
        console.error('Error fetching the sheets data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run only on component mount

  const handleFollowToggle = (index) => {
    const updatedStatus = [...sheetData];
    const currentSheet = updatedStatus[index];
    currentSheet.status = currentSheet.status === "Follow" ? "Following" : "Follow";
    setSheetData(updatedStatus); // Update the sheet data after the status change
  };

  const handleCardClick = (id, status, questions) => {
    // Navigate to a new page with the id, status, and questions in the URL (you may modify as per your route structure)
    navigate(`/sheet/${id}/${status}`, { state: { questions } });
  };

  // Debugging: Log sheetData to see if it's being correctly updated in the state
  console.log("Current sheetData state:", sheetData);

  return (
    <div className='w-[100%] h-full'> 
      <Navbar />
      <div className="text-center font-bold text-4xl mt-2 mb-16 ">Popular sheets</div>

      <div className='flex flex-row flex-wrap gap-10 items-center justify-center h-full'>
  
        {Array.isArray(sheetData) && sheetData.length > 0 ? (
          sheetData.map((sheet, index) => 
          (
            <SheetCard   key={index}   title={sheet.title}   percentage={sheet.percentage}   description={sheet.description}   total={sheet.total}   status={sheet.status}
            onFollowToggle={() => handleFollowToggle(index)}  onCardClick={() => handleCardClick(sheet.id, sheet.status, sheet.questions)} />
          ))
        ) : ( <p>Loading sheets...</p> )}
      </div>
    </div>
  );
}

export default Sheets;
