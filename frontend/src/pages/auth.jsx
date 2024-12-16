import React, { useState } from 'react';
import API from '../utils/api';
import { useToast } from '../components/toastContainer';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const addToast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    try {
      const response = await API.post(endpoint, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token for authenticated requests
        addToast(`${isSignup ? 'Signup' : 'Login'} successful!`, "success");
        // Redirect to home/dashboard
        window.location.href = '/';
      }
    } catch (err) {
      if(err.response?.data?.message === 'Email is already registered'){
        setError('Email is already associated with an account. please use another email');
      }else{
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-96 h-96 perspective">
        <div
          className={`card absolute w-full h-full rounded-lg shadow-lg transition-transform duration-500 ${
            isSignup ? 'rotate-y-180' : ''
          }`}
        >
          {/* Login Form */}
          <div
            className={`card-front absolute w-full h-full bg-white p-8 rounded-lg backface-hidden ${
              isSignup ? 'hidden' : ''
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
              >
                Login
              </button>
            </form>
            <p
              className="mt-4 text-sm text-center cursor-pointer text-blue-500"
              onClick={() => setIsSignup(true)}
            >
              Don't have an account? Signup
            </p>
          </div>

          {/* Signup Form */}
          <div
            className={`card-back absolute w-full h-fit bg-white p-8 rounded-lg backface-hidden transform rotate-y-180 ${
              isSignup ? '' : 'hidden'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
              >
                Signup
              </button>
            </form>
            <p
              className="mt-4 text-sm text-center cursor-pointer text-blue-500"
              onClick={() => setIsSignup(false)}
            >
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
