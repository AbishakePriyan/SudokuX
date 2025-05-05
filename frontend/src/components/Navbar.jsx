import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-yellow-400 shadow-md">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold">SudokuX</div>
      <div className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/game"
          className={({ isActive }) =>
            `hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
          }
        >
          Play
        </NavLink>
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
          }
        >
          Feedback
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
