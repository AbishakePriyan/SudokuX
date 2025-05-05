import React from 'react';

const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-sm">
      <p className="text-yellow-400 text-2xl mb-4">{message}</p>
      <button
        onClick={onClose}
        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition"
      >
        Close
      </button>
    </div>
  </div>
);

export default Modal;
