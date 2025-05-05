import React from 'react';
import Cell from './Cell';

const SudokuBoard = ({ board, initial, solution, onChange }) => (
  <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
    <div className="grid grid-cols-9 gap-1">
      {board.map((row, r) =>
        row.map((val, c) => (
          <Cell
            key={`${r}-${c}`}
            row={r}
            col={c}
            value={val}
            initial={initial}
            solution={solution}
            onChange={onChange}
          />
        ))
      )}
    </div>
  </div>
);

export default SudokuBoard;
