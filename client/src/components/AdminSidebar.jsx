import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaStore,
  FaListAlt,
  FaClipboardList,
  FaTags,
  FaUtensils,
  FaStar,
} from "react-icons/fa";

const navLinkData = [
  { url: "/admin", text: "Dashboard", icon: <FaTachometerAlt /> },
  { url: "/admin/users", text: "Users", icon: <FaUsers /> },
  { url: "/admin/restaurants", text: "Restaurants", icon: <FaStore /> },
  { url: "/admin/categories", text: "Categories", icon: <FaListAlt /> },
  { url: "/admin/menus", text: "Menus", icon: <FaUtensils /> },
  { url: "/admin/coupons", text: "Coupons", icon: <FaTags /> },
  { url: "/admin/orders", text: "Orders", icon: <FaClipboardList /> },
  { url: "/admin/reviews", text: "Reviews", icon: <FaStar /> },
];

const AdminSideBar = () => {
  return (
    <aside className="min-h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 w-64 p-4 hidden md:block shadow-sm pt-28">
      <nav className="flex flex-col gap-2">
        {navLinkData.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSideBar;
