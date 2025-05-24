import { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
<<<<<<< HEAD
    if (comment.trim() === '') return; // กันค่าว่าง
    onSubmit({ rating, comment });
    setRating(4);     // reset form
=======
    onSubmit({ rating, comment });
    setRating(4);     
>>>>>>> origin/main
    setHover(0);
    setComment('');
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-[Poppins] z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-800 mb-4">Review</h2>
=======
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center font-[Poppins] z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#196C2E] mb-4">Review</h2>
>>>>>>> origin/main

          <div className="mb-4">
            <p className="text-green-800 font-semibold mb-1">Star</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="text-2xl"
                >
                  <span className={`${(hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-green-800 font-semibold mb-1">Comment</p>
            <textarea
<<<<<<< HEAD
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
=======
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring focus:border-green-500"
>>>>>>> origin/main
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
            />
          </div>

<<<<<<< HEAD
          <div className="flex justify-between">
            <button
              className="bg-green-800 text-white px-6 py-2 rounded-md font-medium"
=======
          <div className="flex justify-center gap-4">
            <button
              className="bg-[#196C2E] text-white px-6 py-2 rounded-lg font-medium hover:bg-green-900"
>>>>>>> origin/main
              onClick={handleSend}
            >
              Sent
            </button>
            <button
<<<<<<< HEAD
              className="border border-green-800 text-green-800 px-6 py-2 rounded-md font-medium"
=======
              className="border border-gray-300 text-green-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
>>>>>>> origin/main
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
