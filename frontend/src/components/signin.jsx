import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [dob, setDob] = useState('');
  // const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    }
  };

  const fetchUsers = () => {
    navigate('/users');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

        <div className="text-center mb-6">
          <img src="/assets/logo-meditech.png" alt="MediTech Logo" className="mb-4 w-16 mx-auto" />
          <h2 className="text-3xl font-extrabold text-blue-600">Welcome to MediTech</h2>
          <p className="text-gray-600">Sign in to manage your medical records and appointments</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div> */}

          {/* <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div> */}

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">Sign In</button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition">
          <i className="fab fa-google mr-3 text-red-500"></i>Sign in with Google
        </button>
\
        <button onClick={fetchUsers} className="mt-6 w-full py-3 bg-gray-100 text-gray-700 rounded-full shadow-lg hover:bg-gray-200 transition">View Registered Patients</button>


        <p className="mt-6 text-center text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-500 font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
