import wallpaper from '../assets/images/wall3.jpg'; // Ensure the correct path
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted:');
    
    // Validate the form
    if (!name || !email || !password) {
      setError('All fields are required');
      toast.error('All fields are required');
      return;
    }
    
    setIsSubmitting(true); // Set submitting state to true

    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      const { success, message } = result;
      
      if (success) {
        toast.success('Signed up successfully');
        console.log(name, email, password);
        // Redirect after success
        setTimeout(() => {
          navigate('/login'); // Navigates to /login after a short delay
        }, 1000);
      } else {
        setError(message);
        toast.error(message || 'An error occurred during sign up');
      }
    } catch (error) {
      console.log('Error occurred:', error);
      setError('An error occurred while signing up');
      toast.error('An error occurred while signing up');
    } 
    finally {
      // Reset form and submitting state
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }}>
      
      {/* Signup Form */}
      <div className="relative z-10 p-12 bg-white bg-opacity-40 rounded-3xl shadow-2xl w-[600px] text-center backdrop-blur-xl">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Create Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4 text-lg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-white">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-white">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-lg bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-lg text-white">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700">
              Login here
            </a>
          </p>
        </div>

        {/* ToastContainer is used to show toast notifications */}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default Signup;
