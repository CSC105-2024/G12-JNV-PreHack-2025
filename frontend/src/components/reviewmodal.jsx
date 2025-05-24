import { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    onSubmit({ rating, comment });
    setRating(4);     
    setHover(0);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center font-[Poppins] z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#196C2E] mb-4">Review</h2>

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
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring focus:border-green-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              className="bg-[#196C2E] text-white px-6 py-2 rounded-lg font-medium hover:bg-green-900"
              onClick={handleSend}
            >
              Sent
            </button>
            <button
              className="border border-gray-300 text-green-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
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
