import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <header className="bg-[#1a1a1a] text-white py-3 shadow-md">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        
        {/* Logo or App Name */}
        <h1 className="text-xl font-bold text-indigo-500">
          EventHive
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          
          <a href="/" className="hover:text-indigo-400">Home</a>
          <a href="/events" className="hover:text-indigo-400">Events</a>

          {/* Conditionally render Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;