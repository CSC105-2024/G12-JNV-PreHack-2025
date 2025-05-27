import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tree from "../images/Tree.jpg";
import ReviewModal from "../components/reviewmodal";
import { getReviews, createReview } from "../api/userApi";

const Review = () => {
  const { id: activityId } = useParams(); // ✅ รับ activityId จาก URL
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // โหลดคอมเมนต์รีวิวจาก backend
  const fetchReviews = async () => {
    if (!activityId) return;
    setLoading(true);
    try {
      const res = await getReviews(activityId);
      setComments(res.data);
    } catch (e) {
      setComments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [activityId]);

  // ส่งรีวิวใหม่ (user ต้อง login)
  const handleSubmitReview = async (formData) => {
    try {
      await createReview({ ...formData, activityId });
      await fetchReviews();
      setOpenModal(false);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="font-[Poppins] min-h-screen flex justify-center items-center bg-green-800 px-4 py-10 relative">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-lg p-8">
        {/* ...ข้อมูลกิจกรรม เช่นชื่อ, วันที่, คำอธิบาย... */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bg-[#196C2E] hover:bg-green-900 text-white py-2 px-6 rounded-lg text-lg transition font-semibold"
            onClick={() => setOpenModal(true)}
          >
            Review
          </button>
        </div>
      </div>

      {/* Comments box */}
      <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-xl p-4 w-80 z-40">
        <h3 className="text-green-800 font-bold text-sm mb-2">Comments</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
          {loading ? (
            <div>Loading...</div>
          ) : comments.length > 0 ? (
            comments.map((c, i) => (
              <div key={i} className="border-b border-gray-200 pb-2">
                <p>⭐ {c.rating}</p>
                <p className="italic text-gray-600">{c.comment}</p>
                {c.user && (
                  <p className="text-gray-500 text-xs mt-1">
                    By: {c.user.firstname} {c.user.lastname}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      </div>

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
