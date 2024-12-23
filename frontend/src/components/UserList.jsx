// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <img src="/assets/logo-meditech.png" alt="MediTech Logo" className="mb-4 w-16 mx-auto" />
          <h2 className="text-3xl font-extrabold text-green-600">Stored Users</h2>
          <p className="text-gray-600">View registered users and their details</p>
        </div>

        {/* User List Section */}
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {users.map((user, index) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <span className="text-gray-800 font-medium">{user.email}</span>
                <span className="text-gray-500 text-sm">Password: {user.password}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer Section */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
