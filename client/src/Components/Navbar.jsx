import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation for active route detection
import Button from './Button';

const Navbar = () => {
  const location = useLocation();  // Get current route

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b-2 border-gray-200 fixed top-0 left-0 w-full z-10">
      {/* Logo */}
      <div className="logo">
        <div className="font-bold text-2xl">DevMeter</div>
      </div>
      
      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          <Link
            to="/"
            className={`text-xl ${
              location.pathname === '/' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/performance"
            className={`text-xl ${
              location.pathname === '/performance' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Performance
          </Link>
        </li>
        <li>
          <Link
            to="/sheets"
            className={`text-xl ${
              location.pathname === '/sheets' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Coding Sheets
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`text-xl ${
              location.pathname === '/about' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contest/upcoming-contest"
            className={`text-xl ${
              location.pathname === '/about' ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Upcoming Contest
          </Link>
        </li>
      </ul>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link to="/login">
          <Button text="Login" type="primary" />
        </Link>
        <Link to="/signup">
          <Button text="Sign up" type="secondary" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
