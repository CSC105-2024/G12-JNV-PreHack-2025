import { NavLink} from "react-router-dom";
const VolunteerActivity = () => {
    return (
        <div className="bg-[#196C2E] min-h-screen flex justify-center items-center">
         <NavLink
          to="/request"
          className=" hover:opacity-80 transition"
        >
        <h1 className="text-white text-4xl font-bold">Go to Request page</h1>
        </NavLink>
        </div>
    );
  };
  export default VolunteerActivity;