import React from 'react';
import './App.css'; // Tailwind's styles are included here
import './index.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Home from './Components/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';

import Sheets from './Pages/Sheets';
import About from './Pages/About';

import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function App() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Router>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sheets" element={<Sheets />} />
        <Route path="/about" element={<About />} />

       
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
