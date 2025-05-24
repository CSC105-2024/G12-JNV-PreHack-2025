import { useState } from "react";
import Swal from "sweetalert2";

const RequestPopup = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSend = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    Swal.fire({
      icon: "success",
      title: "Sent successfully!",
      text: "Your request has been submitted.",
      confirmButtonColor: "#196C2E",
    }).then(() => {
      setTitle("");
      setDescription("");
      onClose(); 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="bg-white p-10 rounded-2xl w-full max-w-2xl font-poppins shadow-xl border border-gray-200">
        <h2 className="text-center text-2xl font-bold text-[#196C2E] mb-10">
          Request
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-[#196C2E]">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-green-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#196C2E]">Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-green-500`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={handleSend}
            className="bg-[#196C2E] text-white px-8 py-2 rounded-md font-semibold shadow hover:bg-green-800"
          >
            Sent
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-[#196C2E] px-8 py-2 rounded-md font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestPopup;
