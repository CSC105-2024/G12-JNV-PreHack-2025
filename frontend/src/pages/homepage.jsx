import { NavLink } from "react-router-dom";
const Homepage = () => {
    return (
      <div className="bg-[#196C2E] min-h-screen flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Welcome to Homepage</h1>
        <NavLink
          to="/join"
          className=" hover:opacity-80 transition"
        >
        <h1 className="ml-5 text-white text-4xl font-bold">Go to Join page</h1>
        </NavLink>
      </div>
    );
  };
  export default Homepage;
  