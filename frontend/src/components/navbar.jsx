import { NavLink, Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="flex justify-between items-center p-4 text-[#196C2E] h-18">
        {/* Logo */}
        <NavLink
          to="/homepage"
          className="flex items-center hover:opacity-80 transition"
        >
          <img src={logo} alt="Logo" className="h-26 mt-4 w-auto object-contain" />
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 mr-5">
          <NavLink
            to="/myactivity"
            className="font-poppins font-bold hover:text-green-900 transition"
          >
            My Activity
          </NavLink>

          <NavLink
            to="/volunteeractivity"
            className="font-poppins font-bold hover:text-green-900 transition"
          >
            Volunteer Activity
          </NavLink>
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#196C2E] text-white  px-4 py-2 rounded-lg font-bold font-poppins shadow-2xl hover:opacity-80"
            >
              Account
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white text-[#196C2E] shadow-lg border border-gray-300 rounded-lg w-48">
                <NavLink to="/accountsetting" className="block px-4 py-2  hover:bg-gray-100 font-bold font-poppins">
                  Account Settings
                </NavLink>
                <NavLink to="/login" className="block px-4 py-2  hover:bg-gray-100 font-poppins font-bold">
                  Log out
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
