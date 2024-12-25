import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoMeditech from '../photos/meditechlogo.webp';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const calculateStrength = (password) => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    if (password.length >= 6) return "Medium";
    return "Weak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = () => {
    navigate('/users');
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300'}`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-2xl rounded-3xl p-8 relative`}>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-4 right-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <div className="text-center mb-6">
          <img src={logoMeditech}alt="MediTech Logo" className="mb-4 w-16 mx-auto" />
          <h2 className={`text-3xl font-extrabold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Welcome to MediTech</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to manage your medical records and appointments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
              aria-required="true"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`mt-1 block w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                aria-required="true"
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
            <div className="mt-2 text-sm">
              Password Strength: <span className={`font-bold ${calculateStrength(password) === "Strong" ? "text-green-500" : calculateStrength(password) === "Medium" ? "text-yellow-500" : "text-red-500"}`}>
                {calculateStrength(password)}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remember Me</label>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">
            {loading ? <span className="spinner"></span> : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-right text-sm">
          <a href="/forgot-password" className="text-blue-500 font-bold hover:underline">Forgot Password?</a>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className={`mx-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className={`w-full py-3 border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition`}>
          <i className="fab fa-google mr-3 text-red-500"></i>Sign in with Google
        </button>
        <button className={`w-full py-3 border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition mt-3`}>
          <i className="fab fa-facebook mr-3 text-blue-500"></i>Sign in with Facebook
        </button>

        <button onClick={fetchUsers} className={`mt-6 w-full py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full shadow-lg hover:bg-gray-200 transition`}>View Registered Patients</button>

        <p className={`mt-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Don’t have an account? <a href="/signup" className="text-blue-500 font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

const styles = `
  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
