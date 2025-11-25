import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signout } = useContext(UserContext);

  const handleSignout = () => {
    signout();
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/admin" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-yellow-400">Grabbite</span>
          <span className="text-lg font-medium">Admin</span>
        </Link>

        {/* Desktop user info */}
        <div className="hidden md:flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-2xl" />
            <span>{user?.name || "Admin"}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-12 w-40 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-50">
              <Link
                to="/admin/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleSignout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
