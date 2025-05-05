// src/components/Timer.jsx
import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ isActive, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  // 1️⃣ Manage the interval & reset when (re)starting
  useEffect(() => {
    // Clear any existing interval
    clearInterval(intervalRef.current);

    if (isActive) {
      // Reset timer to 0 when starting
      setSeconds(0);

      // Start ticking
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup on unmount or when isActive changes
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  // 2️⃣ After each render where `seconds` changed, tell parent
  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(seconds);
    }
  }, [seconds, onTimeUpdate]);

  // Format MM:SS
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs    = String(seconds % 60).padStart(2, '0');

  return (
    <div className="text-yellow-400 font-mono text-xl">
      {minutes}:{secs}
    </div>
  );
};

export default Timer;
