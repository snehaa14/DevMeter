import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Add toast for success/error notifications

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the form (you can expand this to add more validation logic)
    if (!email || !password) {
      setError('Both fields are required');
      toast.error('Both fields are required');
      return;
    }

    try {
      const url = "http://localhost:5000/auth/login"; // Your backend login route
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to the backend
      });

      if (!response.ok) {
        // If the response status is not ok, handle error
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred during login');
        toast.error(errorData.message || 'An error occurred during login');
        return;
      }

      const result = await response.json();
      const { success, message, token } = result;

      if (success) {
        // If login is successful, store the token and navigate to the home page
        localStorage.setItem('token', token);
        toast.success('Logged in successfully');
        
        setTimeout(() => {
          navigate('/'); // Redirect to homepage or another page after successful login
        }, 2000);
      } else {
        setError(message || 'An error occurred during login');
        toast.error(message || 'An error occurred during login');
      }
    } catch (error) {
      // Handle any unexpected errors during fetch
      setError('An error occurred while logging in');
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <div className="flex justify-center w-[100%] items-center min-h-screen bg-black">
      <div className="w-full max-w-lg bg-[rgba(38,38,38,1)] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Log In</h2>
        
        {/* Display error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input   
              type="email"  
              id="email" 
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              placeholder="Enter your email"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"  
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
          </div>

          {/* Forgot password link */}
          <div className="mb-6 text-right">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">Forgot Password?</Link>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>

        {/* Redirect to signup page if the user does not have an account */}
        <div className="mt-2 text-center">
          <p className="text-sm text-white ml-1">
            Don't have an account? 
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 ml-2">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
