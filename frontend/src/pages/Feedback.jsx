import React, { useState } from 'react';
import api from '../utils/api';
import ToastNotification from '../components/ToastNotification';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', { feedback });
      setSubmitted(true);
      setShowToast(true);
    } catch (err) {
      console.error('Feedback submit failed:', err);
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">
        We value your feedback!
      </h2>

      {submitted ? (
        <p className="text-green-400 text-lg">Thanks for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col">
          <textarea
            className="w-full h-40 p-4 mb-4 bg-gray-800 text-white border border-yellow-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your thoughts..."
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            Submit Feedback
          </button>
        </form>
      )}

      {showToast && (
        <ToastNotification
          message={submitted ? '🎉 Feedback sent!' : '❌ Submission failed.'}
          type={submitted ? 'success' : 'error'}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Feedback;
