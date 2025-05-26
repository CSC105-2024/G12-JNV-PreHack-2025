import { useState } from "react";
import Swal from "sweetalert2";
import Tree from "../images/Tree.jpg";
import { useParams } from "react-router-dom";
import { joinActivity, cancelParticipation } from "../api/userApi";

const Join = () => {
  const { id } = useParams(); // รับ activity id จาก URL
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    try {
      setLoading(true);
      await joinActivity(id);
      setJoined(true);
      Swal.fire({
        title: "Successfully Joined!",
        text: "Thank you for signing up for the event",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-[#196C2E] hover:bg-green-900 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    } catch (err) {
      Swal.fire("Failed", err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your participation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-4",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await cancelParticipation(id);
          setJoined(false);
          Swal.fire({
            title: "Cancelled",
            text: "Your participation has been cancelled.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton:
                "bg-[#196C2E] hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg",
            },
            buttonsStyling: false,
          });
        } catch (err) {
          Swal.fire("Failed", err.response?.data?.message || err.message, "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="font-[Poppins] min-h-screen flex justify-center items-center bg-green-800 px-4 py-10">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-lg p-8">
        {/* รูปกิจกรรม */}
        <div className="overflow-hidden rounded-md mb-6">
          <img
            src={Tree}
            alt="Reforestation Event"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* หัวข้อ */}
        <h2 className="text-2xl font-bold text-left mb-6">
          Volunteers join in reforestation
        </h2>

        {/* รายละเอียดกิจกรรม */}
        <div className="space-y-4 text-sm md:text-base">
          <p><strong>Objective:</strong> Invite students, student loan borrowers, and educational institutions nationwide to plant trees to conserve forest resources.</p>
          <p><strong>Date:</strong> 15-16 June 2025</p>
          <p><strong>Location:</strong> Bang Khun Thian National Park, Samut Prakan Province</p>
          <div>
            <strong>Description:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>🌳 Tree planting activity with expert guidance.</li>
              <li>🧠 Knowledge sessions on tree care and green impact.</li>
              <li>🎨 Art for Nature workshops and poster campaigns.</li>
              <li>🌟 Celebrities and public figures join.</li>
              <li>🥗 Eco-friendly food and beverage zone.</li>
            </ul>
          </div>
        </div>

        {/* ปุ่ม Join / Cancel */}
        <div className="flex justify-center gap-4 mt-8">
          {!joined ? (
            <button
              disabled={loading}
              onClick={handleJoin}
              className="font-semibold bg-[#196C2E] hover:bg-green-900 text-white py-2 px-6 rounded-lg text-lg transition disabled:opacity-60"
            >
              Join
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={handleCancel}
              className="font-semibold bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-lg transition disabled:opacity-60"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
