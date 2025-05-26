import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import Tree from "../images/Tree.jpg";
import { getActivities } from "../api/userApi";

const ITEMS_PER_PAGE = 6;

const VolunteerActivity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลกิจกรรมจาก backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getActivities();
        setActivities(res.data); // array จาก backend
      } catch {
        setActivities([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  const handleClick = (page) => setCurrentPage(page);

  const displayedActivities = activities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 px-4 py-14 font-poppins text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Volunteer Activities</h1>
          <p className="text-sm">Join hands, spread smiles, and make a better 🌏</p>
        </div>

        {/* Top Navigation */}
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="🔍 Search by project name..."
            className="px-5 py-3 rounded-xl w-full md:w-[40%] bg-white border border-green-400 text-black focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            disabled
          />
          <div className="flex items-center w-full md:w-[25%] bg-white px-4 py-3 rounded-xl border border-green-400 text-green-900 shadow-sm gap-2">
            <FaCalendarAlt />
            <input type="date" className="w-full bg-transparent outline-none" disabled />
          </div>
          <NavLink
            to="/request"
            className="bg-white text-green-900 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition w-full md:w-auto text-center"
          >
            Sent Request
          </NavLink>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {loading && <div className="text-white">Loading...</div>}
          {!loading && displayedActivities.map((activity, index) => (
            <div
              key={activity.id || index}
              className="relative bg-white rounded-3xl border border-green-200 p-6 flex gap-5 hover:scale-[1.03] transition-transform duration-300 text-black shadow-lg"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-green-200 flex items-center justify-center shadow-inner border border-green-400">
                <img
                  src={Tree}
                  alt="Activity icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                <div className="text-[#196C2E] font-medium text-sm flex items-center gap-2 mb-2">
                  <FaCalendarAlt /> {new Date(activity.date).toLocaleDateString()}
                </div>
                <NavLink
                  to="/join"
                  className="text-right block font-bold text-green-800"
                >
                  View detail &gt;&gt;&gt;
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="bg-white px-4 py-2 rounded hover:bg-gray-200 text-black disabled:opacity-50"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleClick(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-white px-4 py-2 rounded hover:bg-gray-200 text-black disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerActivity;
