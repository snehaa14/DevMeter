import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import moment from 'moment';

const UpcomingContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contest/upcoming-contest');
        const allowedHosts = ['atcoder.jp', 'leetcode.com', 'codeforces.com', 'codechef.com', 'geeksforgeeks.org'];

        if (response.data && response.data.objects && Array.isArray(response.data.objects)) {
          const filteredContests = response.data.objects.filter(contest => {
            const hostDomain = new URL(contest.host.startsWith('http') ? contest.host : `https://${contest.host}`).hostname;
            return allowedHosts.includes(hostDomain);
          });
          setContests(filteredContests);
        } else {
          setContests([]);
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching contests');
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const getDaysInMonth = (month) => {
    const startOfMonth = moment(month).startOf('month');
    const endOfMonth = moment(month).endOf('month');
    const days = [];
    let day = startOfMonth;

    // Add empty spaces for the previous month's days if the month doesn't start on Sunday
    const startDay = startOfMonth.weekday(); // Get the day of the week for the 1st day
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Adding null for empty spaces
    }

    while (day <= endOfMonth) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(selectedMonth);

  const filteredContestsForDate = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD'); // Format the selected date
    return contests.filter(contest => {
      const contestDate = moment(contest.start).format('YYYY-MM-DD'); // Format the contest date
      return contestDate === formattedDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth(prevMonth => prevMonth.clone().add(1, 'month'));
  };

  const handlePreviousMonth = () => {
    setSelectedMonth(prevMonth => prevMonth.clone().subtract(1, 'month'));
  };

  // Filter today's contests
  const todayContests = contests.filter(contest =>
    moment(contest.start).isSame(moment(), 'day')
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="flex text-white h-full w-full flex-col mt-36 " // Add min-h-screen for full screen height  
    >
      <Navbar notifications={todayContests} />
      <div className="flex justify-between items-center mb-10 mt-10">
        <button
          onClick={handlePreviousMonth}
          className="bg-white bg-opacity-10 backdrop-blur-md border border-white/20 p-6 rounded-md ml-7 mt-4"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold">{selectedMonth.format('MMMM YYYY')}</h2>
        <button
          onClick={handleNextMonth}
          className="bg-white bg-opacity-10 backdrop-blur-md border border-white/20 p-6 rounded-md mr-7 mt-4"
        >
          →
        </button>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 gap-4 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Custom Calendar */}
      <div className="grid grid-cols-7 gap-4 mt-2 ml-1  mr-8 min-h-full w-full">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`border p-4 rounded-lg h-60 w-60 flex flex-col justify-between ${
              !day
                ? 'bg-transparent'
                : 'bg-white bg-opacity-10 backdrop-blur-md border-2 border-white/20 animate-border-move'
            }`}
            style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
          >
            {day ? (
              <>
                <div className="text-lg font-semibold text-white">{day.format('D')}</div>
                <div className="mt-2 flex-1 overflow-y-auto scrollbar-hide">
                  {filteredContestsForDate(day.toDate()).map((contest) => (
                    <div key={contest.id} className="mt-2 font-bold">
                      <a
                        href={contest.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-bold text-white hover:underline"
                      >
                        {contest.event}
                      </a>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-lg font-semibold text-transparent">-</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingContest;
