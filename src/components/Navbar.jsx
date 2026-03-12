import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import samslogo from "../images/samslogo.png";  // ✓ Only the needed import

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="w-full">

      {/* TOP BAR */}
      <div className="bg-[#0067b1] text-white flex justify-between px-10 py-2 text-sm">
        <div className="flex gap-6">
          <span>(00) 875 784 5682</span>
          <span>pacargoinfo@gmail.com</span>
          <span>238, Arimantab, Moska – USA.</span>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-brands fa-facebook text-lg"></i>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="sticky top-0 z-[1000] bg-transparent backdrop-blur">
        <div className="bg-white mx-auto mt-4 py-4 px-10 shadow-lg 
        rounded-full flex justify-between items-center">

          {/* Logo */}
          <img
            src={samslogo}
            alt="Logo"
            className="h-[55px] w-[55px]"
          />

          {/* Mobile menu */}
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "×" : "☰"}
          </button>

          {/* Menu */}
          <ul
            className={`md:flex md:gap-10 font-medium transition-all duration-300 ${
              isMenuOpen
                ? "flex flex-col w-full mt-4 text-center"
                : "hidden md:flex"
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`pb-1 ${
                    location.pathname === item.path
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Mobile Login */}
            <li className="md:hidden">
              <Link to="/loginpage">Login</Link>
            </li>
          </ul>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/enquiryform"
              className="flex items-center gap-3 bg-[#0d87d7] text-white font-semibold 
              px-6 py-2 rounded-full hover:bg-[#0c78c2] transition"
            >
              Enquiry Now
              <span className="bg-[#ff9d30] text-white rounded-full px-3 py-1">→</span>
            </Link>

            <Link
              to="/loginpage"
              className="flex items-center gap-3 border border-[#ff9d30] text-[#ff9d30] 
              font-semibold px-6 py-2 rounded-full hover:bg-[#fff5e6] transition"
            >
              Login
              <span className="text-[#ff9d30]">→</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
