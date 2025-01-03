import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ notifications }) => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => setIsNotificationOpen(!isNotificationOpen);

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b-2 border-gray-200 fixed top-0 left-0 w-full z-10">
      <div className="logo">
        <div className="font-bold text-2xl">DevMeter</div>
      </div>

      <ul className="flex space-x-8">
        <li><Link to="/" className={`text-xl ${location.pathname === '/' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`}>Home</Link></li>
        <li><Link to="/performance" className={`text-xl ${location.pathname === '/performance' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`}>Performance</Link></li>
        <li><Link to="/sheets" className={`text-xl ${location.pathname === '/sheets' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`}>Coding Sheets</Link></li>
        <li><Link to="/about" className={`text-xl ${location.pathname === '/about' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`}>About</Link></li>
        <li><Link to="/contest/upcoming-contest" className={`text-xl ${location.pathname === '/contest/upcoming-contest' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`}>Upcoming Contest</Link></li>
      </ul>

      <div className="flex space-x-4 items-center">
        <div className="relative">
          <button onClick={toggleNotifications} className="text-gray-700 hover:text-red-600">
            <i className="fa fa-bell text-2xl"></i>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <ul className="space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id} className="text-sm text-gray-700">{notification.event} is happening today!</li>
                  ))
                ) : (
                  <li className="text-sm text-gray-700">No contests today!</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <Link to="/login"><Button text="Login" type="primary" /></Link>
        <Link to="/signup"><Button text="Sign up" type="secondary" /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
