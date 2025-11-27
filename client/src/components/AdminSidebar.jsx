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

const AdminSidebar = ({ open, closeSidebar }) => {
  return (
    <>
    
      <aside className="hidden md:block fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 pt-24 p-4 shadow-sm ">
        <nav className="flex flex-col gap-2">
          {navLinkData.map((item, idx) => (
            <NavLink
              key={idx}
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

     
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        >
          <aside
            className="absolute left-0 top-0 w-64 h-full bg-white dark:bg-slate-900 p-4 pt-24 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {navLinkData.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.url}
                  onClick={closeSidebar}
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
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
