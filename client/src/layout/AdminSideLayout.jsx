import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

const AdminSideLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <AdminSidebar open={sidebarOpen} closeSidebar={closeSidebar} />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-800 overflow-auto">
          <Outlet />
        </main>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminSideLayout;
