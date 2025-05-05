import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-8 text-yellow-400 animate-pulse">
        SudokuX
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        Choose your challenge and sharpen your mind!
      </p>
      <button
        onClick={() => navigate('/game')}
        className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
      >
        Play
      </button>
      <button
        onClick={() => navigate('/feedback')}
        className="mt-4 text-sm text-gray-400 hover:text-yellow-400 underline"
      >
        Give Feedback
      </button>
    </div>
  );
};

export default Home;
