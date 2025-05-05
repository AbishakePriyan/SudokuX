import React, { useEffect } from 'react';

const ToastNotification = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-lg fixed top-4 right-4 animate-slide-in`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
