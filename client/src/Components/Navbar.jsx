import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { toast } from 'react-toastify'; // Add toast for notifications

const Navbar = ({ notifications }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => setIsNotificationOpen(!isNotificationOpen);

  // Check if user is logged in by checking if token exists in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    toast.success('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-[#000000] backdrop-blur-lg border-b-2 border-gray-200 fixed top-0 left-0 w-full z-10 shadow-lg">
      <div className="logo">
        <div className="font-bold text-2xl text-white">DevMeter</div>
      </div>

      <ul className="flex space-x-8">
        <li>
          <Link
            to="/"
            className={`text-xl ${location.pathname === '/' ? 'text-[#5b1b6c] font-bold' : 'text-white hover:text-[#5b1b6c]'}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/performance"
            className={`text-xl ${location.pathname === '/performance' ? 'text-[#5b1b6c] font-bold' : 'text-white hover:text-[#5b1b6c]'}`}
          >
            Performance
          </Link>
        </li>
        <li>
          <Link
            to="/sheets"
            className={`text-xl ${location.pathname === '/sheets' ? 'text-[#5b1b6c] font-bold' : 'text-white hover:text-[#5b1b6c]'}`}
          >
            Coding Sheets
          </Link>
        </li>
        <li>
          <Link to="/about" className={`text-xl ${location.pathname === '/about' ? 'text-[#5b1b6c] font-bold' : 'text-white hover:text-[#5b1b6c]'}`}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contest/upcoming-contest"
            className={`text-xl ${location.pathname === '/contest/upcoming-contest' ? 'text-[#5b1b6c] font-bold' : 'text-white hover:text-[#5b1b6c]'}`}
          >
            Upcoming Contest
          </Link>
        </li>
      </ul>

      <div className="flex space-x-4 items-center">
        <div className="relative">
          <button onClick={toggleNotifications} className="text-white hover:text-[#5b1b6c]">
            <i className="fa fa-bell text-2xl"></i>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white/60 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg p-4">
              <ul className="space-y-2">
                {notifications && notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id} className="text-sm text-white">
                      {notification.event} is happening today!
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-white">No contests today!</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <Button
            text="Logout"
            type="secondary" // Using secondary button style for logout
            onClick={handleLogout} // Handling logout functionality
          />
        ) : (
          <>
            <Link to="/login">
              <Button text="Login" type="primary" />
            </Link>
            <Link to="/signup">
              <Button text="Sign up" type="secondary" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
