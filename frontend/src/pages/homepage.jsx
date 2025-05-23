import Tree from "../images/Tree.jpg";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const activities = [
    {
      title: "Sweep in Temple",
      description:
        "Green space restoration activities by planting trees in degraded areas, promoting cooperation between …",
    },
    {
      title: "Garbage collection",
      description:
        "Join us in picking up trash in public areas such as parks, beaches and community areas to help reduce …",
    },
    {
      title: "Health check",
      description:
        "Provide basic health screening services such as blood pressure measurement, blood sugar level test, and health …",
    },
    {
      title: "Community Clean-up",
      description:
        "Help us clean public spaces and parks to maintain a clean and healthy environment for everyone.",
    },
    {
      title: "Tree Planting Day",
      description:
        "Join the community in planting new trees to restore greenery and improve air quality.",
    },
    {
      title: "Recycling Workshop",
      description:
        "Teach locals how to properly recycle materials and reduce household waste effectively.",
    },
  ];

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
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <NavLink
                to="/join"
                className="font-poppins font-bold hover:opacity-80 transition">

                   <img src={Tree} alt="Activity" className="w-full h-64 object-cover" />
                </NavLink>
          {/* <img src={Tree} alt="Activity" className="w-full h-64 object-cover" /> */}
          <div className="text-left p-5">
            <h3 className="text-[16px] font-bold">
              Volunteers join in reforestation
            </h3>
            <p className="text-[14px] text-[#333333] mt-2">
              Green space restoration activities by planting trees in degraded
              areas, promoting cooperation between communities and volunteers,
              and providing knowledge about nature conservation to create a
              sustainable ecosystem for future generations.
            </p>
            <p className="text-[12px] text-right text-[#196C2E] font-semibold mt-2 cursor-pointer">
              view more detail
            </p>
          </div>
        </div>
      </section>

      {/* Past Activities */}
      <section className="w-full max-w-5xl mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-[32px] font-extrabold">
            Past activities
          </h2>
          <button className="text-white text-[20px]">⟳</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <NavLink
                to="/review"
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
      </section>
    </div>
  );
};

export default Homepage;
