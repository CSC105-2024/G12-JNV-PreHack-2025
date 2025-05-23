import { NavLink, Outlet } from "react-router-dom";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 text-[#196C2E] h-18">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center hover:opacity-80 transition"
        >
          <img src={logo} alt="Logo" className="h-26 mt-4 w-auto object-contain" />
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 mr-5">
          <NavLink
            to="/myactivity"
            className="font-poppins font-bold hover:opacity-80 transition"
          >
            My Activity
          </NavLink>

          <NavLink
            to="/volunteeractivity"
            className="font-poppins font-bold hover:opacity-80 transition"
          >
            Volunteer Activity
          </NavLink>

          <NavLink
            to="/login"
            className="font-poppins font-bold hover:opacity-80 transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="font-poppins font-bold hover:opacity-80 transition"
          >
            Register
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
