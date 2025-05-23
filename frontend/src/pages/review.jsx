import Tree from "../images/Tree.jpg";
import ReviewModal from "../components/reviewmodal";
import { useState } from "react";

const Review = () => {
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([
    { rating: 5, comment: "Great event! 🌱" },
  ]);

  const handleSubmitReview = (newComment) => {
    setComments((prev) => [...prev, newComment]);
    setOpenModal(false);
  };

  return (
    <div className="font-[Poppins] min-h-screen flex justify-center items-center bg-green-800 px-4 py-10 relative">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-lg p-8">
        {/* Image */}
        <div className="overflow-hidden rounded-md mb-6">
          <img
            src={Tree}
            alt="Reforestation Event"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-left mb-6 ">
          Volunteers join in reforestation
        </h2>

        {/* Details */}
        <div className="space-y-4 text-sm md:text-base">
          <p>
            <strong>Objective:</strong> Invite students, student loan borrowers,
            and educational institutions nationwide to plant trees to conserve
            forest resources.
          </p>
          <p>
            <strong>Date:</strong> 15-16 June 2025
          </p>
          <p>
            <strong>Location:</strong> Bang Khun Thian National Park, Samut
            Prakan Province
          </p>
          <div>
            <strong>Description:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>
                🌳 Tree planting activity: Volunteers will be given advice on
                how to plant trees properly and can choose the trees they want
                to plant according to the environment of each area.
              </li>
              <li>
                🧠 Knowledge lecture: Lecturers from the Royal Forest Department
                and environmental researchers will provide knowledge on tree
                care and the impact of increasing green space on the ecosystem.
              </li>
              <li>
                🎨 Art for Nature activity: Workshops on painting plant pots and
                making campaign posters will be held, allowing participants to
                create artwork that conveys the importance of trees.
              </li>
              <li>
                🌟 Special guests: Many celebrities and public figures will join
                in planting trees and share their inspiration for preserving
                nature.
              </li>
              <li>
                🥗 Eco-friendly food and beverage zone: There are restaurants
                that use eco-friendly packaging and menus made from organic
                ingredients.
              </li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bg-green-600 hover:bg-[#196C2E] text-white py-2 px-6 rounded-full text-lg transition"
            onClick={() => setOpenModal(true)}
          >
            Review
          </button>
        </div>
      </div>

      {/* Comments box */}
      {comments.length > 0 && (
        <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-xl p-4 w-80 z-40">
          <h3 className="text-green-800 font-bold text-sm mb-2">Comments</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
            {comments.map((c, i) => (
              <div key={i} className="border-b border-gray-200 pb-2">
                <p>⭐ {c.rating}</p>
                <p className="italic text-gray-600">{c.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review modal */}
      <ReviewModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
};

export default Review;
