// import React, { useState } from 'react';
// import Navbar from '../Components/Navbar';
// import Button from '../Components/Button';
// import axios from 'axios';
// import LeetCodeData from '../Components/LeetCodeData';
// import LeetCodeSubmissionChart from '../Components/LeetCodeSubmissionChart'; 
// import CodeChefData from '../Components/CodeChef';  // Import CodeChefData component
// import CodeforcesData from '../Components/Codeforces';

// function Performance() {
//   const [leetCodeUsername, setLeetCodeUsername] = useState('');
//   const [gfgUsername, setGfgUsername] = useState('');
//   const [codeforcesUsername, setCodeforcesUsername] = useState('');
//   const [codechefUsername, setCodechefUsername] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [codechefData, setCodechefData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'leetCodeUsername') setLeetCodeUsername(value);
//     if (name === 'gfgUsername') setGfgUsername(value);
//     if (name === 'codeforcesUsername') setCodeforcesUsername(value);
//     if (name === 'codechefUsername') setCodechefUsername(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);  // Clear any previous errors
  
//     try {
//       let response;
//       // Fetch LeetCode data
//       if (leetCodeUsername) {
//         response = await axios.get(`http://localhost:5000/leetcode/${leetCodeUsername}`);
//         console.log("LeetCode data:", response.data);
//       }
  
//       // Fetch GFG data
//       if (gfgUsername) {
//         response = await axios.get(`http://localhost:5000/gfg/${gfgUsername}`);
//         console.log("GFG data:", response.data);
//       }
  
//       // Fetch Codeforces data
//       if (codeforcesUsername) {
//         try {
//           console.log('Fetching Codeforces data for:', codeforcesUsername);
//           const response = await axios.get(`http://localhost:5000/codeforces/${codeforcesUsername}`);
//           const { userInfo, userRating, userStatus } = response.data;
//           console.log('Codeforces data:', response.data);
          
//           // Store Codeforces data in state
//           setUserData((prevData) => ({
//             ...prevData,
//             codeforces: { userInfo, userRating, userStatus },
//           }));
//         } catch (error) {
//           console.error('Error fetching Codeforces data:', error);
//           setError('Error fetching Codeforces data. Please try again.');
//           setUserData(null);
//           return;  // Return early if this part fails
//         }
//       }
  
//       // Fetch CodeChef data
//       if (codechefUsername) {
//         try {
//           console.log('Fetching CodeChef data for:', codechefUsername);
//           const response = await axios.get(`http://localhost:5000/codechef/${codechefUsername}`);
//           console.log("CodeChef data:", response.data);
//           setCodechefData(response.data);  // Store the CodeChef data
//         } catch (error) {
//           console.error('Error fetching CodeChef data:', error);
//           setError('Error fetching CodeChef data. Please try again.');
//           setCodechefData(null);
//           return;  // Return early if this part fails
//         }
//       }
  
//       setSubmitted(true);
//       setLoading(false);
//     } catch (err) {
//       console.error('General fetch error:', err);  // Log the error for debugging
//       setError('Error fetching data, please try again');
//       setUserData(null);
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="w-full h-full relative pt-20 mt-5 text-white">
//       <Navbar />
//       <form onSubmit={handleSubmit} className=" top-0 left-0 mt-12 flex flex-col space-y-8 px-10 py-8 w-full rounded-lg 
//       shadow-2xl text-white max-w-6xl mx-auto">
//         <div className="flex flex-row space-x-6">
//           <div className="w-full">
//             <label htmlFor="leetCodeUsername" className="text-lg font-semibold mb-2 block text-gray-300">LeetCode Username</label>
//             <input type="text" id="leetCodeUsername" name="leetCodeUsername"  value={leetCodeUsername || ''}  onChange={handleChange} placeholder="Enter LeetCode username" className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg 
//               focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="w-full">
//             <label htmlFor="gfgUsername" className="text-lg font-semibold mb-2 block text-gray-300">GFG Username</label>
//             <input
//               type="text"
//               id="gfgUsername"
//               name="gfgUsername"
//               value={gfgUsername || ''}
//               onChange={handleChange}
//               placeholder="Enter GFG username"
//               className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         <div className="flex flex-row space-x-6">
//           <div className="w-full">
//             <label htmlFor="codeforcesUsername" className="text-lg font-semibold mb-2 block text-gray-300">Codeforces Username</label>
//             <input
//               type="text"
//               id="codeforcesUsername"
//               name="codeforcesUsername"
//               value={codeforcesUsername || ''}
//               onChange={handleChange}
//               placeholder="Enter Codeforces username"
//               className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div className="w-full">
//             <label htmlFor="codechefUsername" className="text-lg font-semibold mb-2 block text-gray-300">CodeChef Username</label>
//             <input
//               type="text"
//               id="codechefUsername"
//               name="codechefUsername"
//               value={codechefUsername || ''}
//               onChange={handleChange}
//               placeholder="Enter CodeChef username"
//               className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//         </div>

//         <Button type="primary" text="Submit" className="w-auto text-white" />
//       </form>

//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10">
//           <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
//         </div>
//       )}

//       {submitted && !loading && userData && <LeetCodeData userData={userData} />}
//       {submitted  && !loading && chartData && <LeetCodeSubmissionChart chartData={chartData} />}

//       {submitted && !loading && userData?.codeforces && (
//   <>
//     {console.log('User Info:', userData.codeforces.userInfo)}  // For debugging
//     {console.log('Contest Data:', userData.codeforces.userRating)}  // For debugging

//     {/* Extract user info */}
//     const { firstName, lastName, handle, city, country, rating, maxRank, maxRating } = userInfo;

    
//     {/* Assuming one of the arrays is for contest data */}
//     const contestData = userData.codeforces.userRating;
//     const contestCount = contestData.length;  // Assuming contestData is an array of contests

//     <div>
//     <h1>Performance Details</h1>
//       <p>Full Name: {firstName} {lastName}</p>
//       <p>Handle: {handle}</p>
//       <p>City: {city}, Country: {country}</p>
//       <p>Rating: {rating}</p>
//       <p>Max Rank: {maxRank}</p>
//       <p>Max Rating: {maxRating}</p>
//       {/* <h3>Total Number of Contests: {contestCount}</h3>

//       <h3>Contest Ratings:</h3>
//       <ul>
//         {contestData.map((contest, index) => (
//           <li key={index}>
//             Contest {index + 1}: {contest.name || 'Unnamed Contest'} - Rating: {contest.rating || 'N/A'}
//           </li>
//         ))}
//       </ul> */}
//     </div>

//     {/* Alternatively, use CodeforcesData component */}
//     <CodeforcesData 
//       userDetails={userData.codeforces.userInfo}
//       contestData={contestData}
//       contestCount={contestCount}
//     />
//   </>
// )}



//       {error && <div className="mt-6 text-red-500">{error}</div>}
//     </div>
//   );
// }

// export default Performance;


import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Button from '../Components/Button';
import axios from 'axios';
import LeetCodeData from '../Components/LeetCodeData';
import LeetCodeSubmissionChart from '../Components/LeetCodeSubmissionChart'; 
import CodeChefData from '../Components/CodeChef';  
import Codeforces from '../Components/Codeforces';


function Performance() {
  const [leetCodeUsername, setLeetCodeUsername] = useState('');
  const [gfgUsername, setGfgUsername] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');
  const [codechefUsername, setCodechefUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'leetCodeUsername') setLeetCodeUsername(value);
    if (name === 'gfgUsername') setGfgUsername(value);
    if (name === 'codeforcesUsername') setCodeforcesUsername(value);
    if (name === 'codechefUsername') setCodechefUsername(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (leetCodeUsername) {
        response = await axios.get(`http://localhost:5000/leetcode/${leetCodeUsername}`);
      }
      if (gfgUsername) {
        response = await axios.get(`http://localhost:5000/gfg/${gfgUsername}`);
      }
      if (codeforcesUsername) {
        try {
          console.log('Fetching Codeforces data for:', codeforcesUsername);
          const response = await axios.get(`http://localhost:5000/codeforces/${codeforcesUsername}`);
          const { userInfo, userRating, userStatus } = response.data;
          console.log('Codeforces data:', response.data);
          
          setCodeforcesData((prevData) => ({
            ...prevData,
            codeforcesData: { userInfo, userRating, userStatus },
          }));

          console.log(codeforcesData);
          // console.log("codeforcesData.codeforces.userInfo.lastName:",codeforcesData.codeforces.userInfo.lastName)
        } 
        catch (error) 
        {
          if (error.response && error.response.status === 404) 
            {
            console.error('User not found on Codeforces:', codeforcesUsername);
            setError(`User ${codeforcesUsername} not found on Codeforces.`);
          } 
          else {
            console.error('Error fetching Codeforces data:', error);
            setError('Error fetching Codeforces data. Please try again.');
          }
          setCodeforcesData(null);
          return;
        }
      }
      
      if (codechefUsername) {
        try {
          const response = await axios.get(`http://localhost:5000/codechef/${codechefUsername}`);
          setCodechefData(response.data);
          setError(null);
        } catch (error) {
          setError('Error fetching CodeChef data. Please try again.');
          setCodechefData(null);
        }
      }

      const userData = response.data;
      setUserData(userData);
      setError(null);
      setSubmitted(true);
      setLoading(false);

      if (userData.submissionCalendar) {
        const submissionCalendar = userData.submissionCalendar;
        const dates = [];
        const submissions = [];
        const colors = [];

        Object.keys(submissionCalendar).forEach((timestamp) => {
          const date = new Date(parseInt(timestamp) * 1000);
          const formattedDate = date.toISOString().split('T')[0];
          const submissionCount = submissionCalendar[timestamp];

          dates.push(formattedDate);
          submissions.push(submissionCount);

          const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
          colors.push(randomColor);
        });

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Number of Submissions',
              data: submissions,
              backgroundColor: colors,
              borderColor: colors.map(color => color.replace('0.2', '1')),
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (err) {
      setError('Error fetching data, please try again');
      setUserData(null);
      setSubmitted(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative pt-20 mt-5 text-white">
      <Navbar />
      <form onSubmit={handleSubmit} className=" top-0 left-0 mt-12 flex flex-col space-y-8 px-10 py-8 w-full rounded-lg shadow-2xl text-white max-w-6xl mx-auto">
        <div className="flex flex-row space-x-6">
          <div className="w-full">
            <label htmlFor="leetCodeUsername" className="text-lg font-semibold mb-2 block text-gray-300">LeetCode Username</label>
            <input type="text" id="leetCodeUsername" name="leetCodeUsername" value={leetCodeUsername || ''} onChange={handleChange} placeholder="Enter LeetCode username" className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="w-full">
            <label htmlFor="gfgUsername" className="text-lg font-semibold mb-2 block text-gray-300">GFG Username</label>
            <input type="text" id="gfgUsername" name="gfgUsername" value={gfgUsername || ''} onChange={handleChange} placeholder="Enter GFG username" className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>

        <div className="flex flex-row space-x-6">
          <div className="w-full">
            <label htmlFor="codeforcesUsername" className="text-lg font-semibold mb-2 block text-gray-300">Codeforces Username</label>
            <input type="text" id="codeforcesUsername" name="codeforcesUsername" value={codeforcesUsername || ''} onChange={handleChange} placeholder="Enter Codeforces username" className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div className="w-full">
            <label htmlFor="codechefUsername" className="text-lg font-semibold mb-2 block text-gray-300">CodeChef Username</label>
            <input type="text" id="codechefUsername" name="codechefUsername" value={codechefUsername || ''} onChange={handleChange} placeholder="Enter CodeChef username" className="mb-1 p-4 w-full border text-black bg-gray-100 font-semibold border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        <Button type="primary" text="Submit" className="w-auto text-white" />
      </form>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {submitted && !loading && userData && <LeetCodeData userData={userData} />}
      {submitted && !loading && chartData && <LeetCodeSubmissionChart chartData={chartData} />}
      {submitted && !loading && codechefData && <CodeChefData codechefData={codechefData} />}
      {submitted && !loading && codeforcesData && <Codeforces codeforcesData={codeforcesData}/>}
          
          

        
       

        
          
      
      
      {error && <div className="mt-6 text-red-500">{error}</div>}
    </div>
  );
}

export default Performance;
