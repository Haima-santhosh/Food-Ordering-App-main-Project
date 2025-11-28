import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const { user, signout } = useContext(UserContext);

  const cartItems = useSelector((state) => state.cart); 
const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0); 


  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignout = () => {
    signout();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
       
        <Link to="/" className="flex items-center">
          <img src="/logo1.png" alt="Logo" className="h-10 w-auto" />
        </Link>

       
        <nav className="hidden md:flex space-x-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 font-semibold ${
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

       
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 text-xl">
  <FaShoppingCart />
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  )}
</Link>


          {user ? (
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
              >
                <FaUserCircle className="text-gray-700 text-2xl hover:text-blue-600" />
                <span className="text-gray-800 font-medium hover:text-blue-600">
                  {user.name}
                </span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg flex flex-col z-50">
                  <Link
                    to="/my-profile"
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/my-reviews"
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Reviews
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>

      
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}


       <Link to="/cart" className="relative text-gray-700 text-xl">
  <FaShoppingCart />
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  )}
</Link>




          {user ? (
            <>
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md cursor-pointer"
              >
                <FaUserCircle className="text-gray-700 text-xl" />
                <span className="text-gray-800 font-light">{user.name}</span>
              </div>

              {dropdownOpen && (
                <div className="flex flex-col mt-1 space-y-1">
                  <Link
                    to="/my-profile"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/my-reviews"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    My Reviews
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="px-3 py-2 text-left hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/signin"
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
