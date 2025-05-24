import Tree from "../images/Tree.jpg";
import { MdCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Myactivity = () => {
  const activities = [
    { title: "Sweep in Temple", date: "15/06/2025" },
    { title: "Sweep in Temple", date: "15/06/2025" },
    { title: "Sweep in Temple", date: "15/06/2025" },
    { title: "Sweep in Temple", date: "15/06/2025" },
    { title: "Sweep in Temple", date: "15/06/2025" },
    { title: "Sweep in Temple", date: "15/06/2025" },
  ];

  const pastActivities = [
    { title: "Sweep in Temple", date: "14/06/2025" },
    { title: "Sweep in Temple", date: "12/12/2024" },
    { title: "Sweep in Temple", date: "10/10/2024" },
    { title: "Sweep in Temple", date: "05/10/2024" },
    { title: "Sweep in Temple", date: "01/10/2024" },
    { title: "Sweep in Temple", date: "28/09/2024" },
  ];

  const ActivityCard = ({ title, date, linkTo }) => (
    <Link to={linkTo} className="w-full max-w-[280px]">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
        <img src={Tree} alt="activity" className="w-full h-[140px] object-cover" />
        <div className="p-4">
          <h2 className="text-black text-lg font-semibold font-poppins">{title}</h2>
          <p className="text-[#196C2E] text-sm mt-2 font-poppins flex items-center font-bold">
            <MdCalendarToday className="text-[#196C2E] text-base mr-2" />
            {date}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                {...activity}
                linkTo="/join"
              />
            ))}
          </div>
        </div>

        {/* Past Activities */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8">
          <div className="text-[#196C2E] text-2xl font-semibold mb-6 pl-2">
            Past Activities
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {pastActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                {...activity}
                linkTo="/review"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myactivity;
