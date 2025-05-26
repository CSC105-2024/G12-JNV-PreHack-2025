import { useEffect, useState } from "react";
import Tree from "../images/Tree.jpg";
import { MdCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getMyActivities, getMyPastActivities } from "../api/userApi";

const Myactivity = () => {
  const [activities, setActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลกิจกรรมที่เข้าร่วมและกิจกรรมที่จบแล้ว
    Promise.all([getMyActivities(), getMyPastActivities()])
      .then(([resUpcoming, resPast]) => {
        setActivities(resUpcoming.data);
        setPastActivities(resPast.data);
      })
      .catch(() => {
        setActivities([]);
        setPastActivities([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const ActivityCard = ({ id, title, date, linkTo }) => (
    <Link to={linkTo.replace(":id", id)} className="w-full max-w-[280px]">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
        <img src={Tree} alt="activity" className="w-full h-[140px] object-cover" />
        <div className="p-4">
          <h2 className="text-black text-lg font-semibold font-poppins">{title}</h2>
          <p className="text-[#196C2E] text-sm mt-2 font-poppins flex items-center font-bold">
            <MdCalendarToday className="text-[#196C2E] text-base mr-2" />
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-[#196C2E] min-h-screen px-4 sm:px-6 py-10 font-poppins flex flex-col items-center space-y-16">
      <div className="text-white text-4xl font-bold text-center">
        My Activities
      </div>

      <div className="w-full max-w-6xl space-y-10">
        {/* Upcoming */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8">
          <div className="text-[#196C2E] text-2xl font-semibold mb-6 pl-2">
            Upcoming
          </div>
          {loading ? (
            <div className="text-center py-10 text-[#196C2E]">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  date={activity.date}
                  linkTo="/join/:id"
                />
              ))}
              {activities.length === 0 && (
                <div className="text-[#196C2E] font-semibold col-span-3 text-center">No upcoming activities.</div>
              )}
            </div>
          )}
        </div>

        {/* Past Activities */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8">
          <div className="text-[#196C2E] text-2xl font-semibold mb-6 pl-2">
            Past Activities
          </div>
          {loading ? (
            <div className="text-center py-10 text-[#196C2E]">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
              {pastActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  date={activity.date}
                  linkTo="/review/:id"
                />
              ))}
              {pastActivities.length === 0 && (
                <div className="text-[#196C2E] font-semibold col-span-3 text-center">No past activities.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myactivity;
