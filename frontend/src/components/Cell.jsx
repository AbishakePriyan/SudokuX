import React from 'react';

const Cell = ({ row, col, value, initial, solution, onChange }) => {
  const display = value || '';
  const isPrefilled = initial[row][col] !== 0;
  const isCorrect = !isPrefilled && value === solution[row][col];
  const isWrong =
    !isPrefilled && value !== 0 && value !== solution[row][col];

  const handleInput = (e) => {
    const v = e.target.value.replace(/[^1-9]/g, '');
    onChange(row, col, v ? parseInt(v) : 0);
  };

  let colors = isPrefilled
    ? 'bg-gray-700 text-white border-gray-600'
    : isCorrect
    ? 'bg-green-500 text-white border-green-700'
    : isWrong
    ? 'bg-red-500 text-white border-red-700'
    : 'bg-gray-900 text-yellow-400 border-gray-500';

  return (
    <input
      className={`w-10 h-10 text-center text-lg font-bold border-2 rounded-sm focus:outline-none ${colors}`}
      value={display}
      onChange={handleInput}
      disabled={isPrefilled}
      maxLength={1}
    />
  );
};

export default Cell;
