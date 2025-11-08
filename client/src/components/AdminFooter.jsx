import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-white shadow-2xl dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 text-gray-950 font-extrabold dark:text-gray-300 text-center py-4 text-sm">
      <p className="p-4">
        &copy; {new Date().getFullYear()} Grabbite Admin Panel. All Rights
        Reserved
      </p>
    </footer>
  );
};

export default AdminFooter;