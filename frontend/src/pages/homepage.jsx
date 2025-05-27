import { useEffect, useState } from "react";
import Tree from "../images/Tree.jpg";
import { NavLink } from "react-router-dom";
import { getActivities } from "../api/userApi.ts"; // ฟังก์ชันที่เชื่อม backend

const Homepage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลกิจกรรมจาก backend
    getActivities()
      .then((res) => setActivities(res.data))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="bg-[#196C2E] min-h-screen flex flex-col items-center text-center p-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Recommend Volunteer Activity */}
      <section className="w-full max-w-5xl">
        <h2 className="text-white text-[28px] font-extrabold text-left mb-4">
          Recommend Volunteer Activities
        </h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
          <NavLink to="/join" className="font-poppins font-bold hover:opacity-80 transition">
            <img src={Tree} alt="Activity" className="w-full h-64 object-cover" />
          </NavLink>
          <div className="text-left p-5">
            <h3 className="text-[16px] font-bold">
              Volunteers join in reforestation
            </h3>
            <p className="text-[14px] text-[#333333] mt-2">
              Green space restoration activities by planting trees in degraded areas, promoting cooperation between communities and volunteers, and providing knowledge about nature conservation to create a sustainable ecosystem for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Past Activities */}
      <section className="w-full max-w-5xl mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-[32px] font-extrabold">Past activities</h2>
        </div>
        {loading ? (
          <div className="text-white text-xl py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
              >
                <NavLink
                  to={`/review/${activity.id}`} // ส่ง id ไปหน้ารีวิวแบบ dynamic
                  className="font-poppins font-bold hover:opacity-80 transition"
                >
                  <img
                    src={Tree}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                </NavLink>
                <div className="text-left p-4">
                  <h3 className="text-[14px] font-bold">{activity.title}</h3>
                  <p className="text-[12px] text-[#333333] mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
