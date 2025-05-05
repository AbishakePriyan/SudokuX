import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DifficultySelector from '../components/DifficultySelector';
import SudokuBoard from '../components/SudokuBoard';
import Timer from '../components/Timer';
import ToastNotification from '../components/ToastNotification';
import Modal from '../components/Modal';
import api from '../utils/api';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Game = () => {
  const { difficulty: paramDiff } = useParams();
  const navigate = useNavigate();

  // State
  const [difficulty, setDifficulty] = useState(paramDiff || 'easy');
  const [initial, setInitial] = useState([]);
  const [solution, setSolution] = useState([]);
  const [board, setBoard] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // Sync URL param → state
  useEffect(() => {
    if (paramDiff && paramDiff !== difficulty) {
      setDifficulty(paramDiff);
    }
  }, [paramDiff]);

  // Fetch a new puzzle from backend
  const startGame = async () => {
    try {
      const res = await api.get('/puzzle', { params: { difficulty } });
      const { puzzle, solution: sol } = res.data;

      setInitial(puzzle.map((r) => [...r]));
      setBoard(puzzle.map((r) => [...r]));
      setSolution(sol);
      setIsWin(false);
      setElapsed(0);
      setTimerActive(true);
      setShowToast(false);
    } catch (err) {
      console.error('Failed to load puzzle:', err);
      setShowToast(true);
    }
  };

  // On difficulty change, start new game
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Handle cell changes
  const handleChange = (r, c, val) => {
    if (initial[r][c] !== 0) return; // can't change prefilled
    const b = board.map((row) => [...row]);
    b[r][c] = val;
    setBoard(b);

    if (JSON.stringify(b) === JSON.stringify(solution)) {
      setIsWin(true);
      setTimerActive(false);
      setShowToast(true);
    }
  };

  // Show loading if puzzle not ready
  if (!initial.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading puzzle...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Header + Timer */}
        <div className="flex w-full justify-between items-center">
          <h2 className="text-4xl text-yellow-400 font-semibold">
            Sudoku – {capitalize(difficulty)}
          </h2>
          <Timer isActive={timerActive} onTimeUpdate={setElapsed} />
        </div>

        {/* Difficulty buttons */}
        <DifficultySelector
          difficulty={difficulty}
          onSelect={(lvl) => navigate(`/game/${lvl}`)}
        />

        {/* New puzzle button */}
        <button
          onClick={startGame}
          className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
        >
          New {capitalize(difficulty)} Puzzle
        </button>

        {/* Sudoku board */}
        <SudokuBoard
          board={board}
          initial={initial}
          solution={solution}
          onChange={handleChange}
        />

        {/* Win modal */}
        {isWin && (
          <Modal
            message={`🎉 You solved it in ${elapsed} seconds!`}
            onClose={() => setIsWin(false)}
          />
        )}

        {/* Toast for errors or success */}
        {showToast && (
          <ToastNotification
            message={isWin ? '🎉 Congratulations!' : '⚠️ Could not load puzzle.'}
            type={isWin ? 'success' : 'error'}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
