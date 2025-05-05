import React from 'react';

const DifficultySelector = ({ difficulty, onSelect }) => {
  const levels = ['easy', 'medium', 'hard'];

  return (
    <div className="flex justify-center space-x-4 mt-6">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105
            ${
              difficulty === level
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-700 text-yellow-400'
            }`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
