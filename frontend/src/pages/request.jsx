import { useEffect, useState } from "react";
import RequestPopup from "../components/requestmodal";
import { getAllRequests, createRequest } from "../api/userApi";

const Request = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getAllRequests();
        setRequests(res.data);
      } catch (e) {
        setRequests([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleRequestSubmit = async (formData) => {
    try {
      await createRequest(formData);
      const res = await getAllRequests();
      setRequests(res.data);
      setIsOpen(false);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to create request");
    }
  };

  return (
    <div className="bg-[#196C2E] min-h-screen flex justify-center items-center px-4 font-poppins relative">
      <div className="bg-white rounded-2xl p-10 w-full max-w-4xl shadow-md z-0">
        <h1 className="text-center text-2xl font-bold text-[#196C2E] mb-8">
          Follow Request
        </h1>

        <div className="rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Titles</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#606060]">
              {loading ? (
                <tr>
                  <td className="px-6 py-6" colSpan={3}>Loading...</td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td className="px-6 py-6" colSpan={3}>No requests found.</td>
                </tr>
              ) : (
                requests.map((req, i) => (
                  <tr key={req.id} className="border-b border-gray-200">
                    <td className="px-6 py-3">{req.title}</td>
                    <td className="px-6 py-3">{req.description}</td>
                    <td className="px-6 py-3 font-medium capitalize">{req.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="bg-[#196C2E] text-white px-8 py-2 rounded-md font-semibold shadow hover:bg-green-800"
            onClick={() => setIsOpen(true)}
          >
            Request
          </button>
        </div>
      </div>

      {isOpen && (
        <RequestPopup
          onClose={() => setIsOpen(false)}
          onSubmit={handleRequestSubmit}
        />
      )}
    </div>
  );
};

export default Request;
