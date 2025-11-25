import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-white shadow-inner dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 text-gray-950 font-medium dark:text-gray-300 text-center py-4 text-sm mt-auto">
      &copy; {new Date().getFullYear()} Grabbite Admin Panel. All Rights Reserved
    </footer>
  );
};

export default AdminFooter;
