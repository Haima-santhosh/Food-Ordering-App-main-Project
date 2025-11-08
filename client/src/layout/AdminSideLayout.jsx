
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminLayout = () => (
  <div className="flex flex-col min-h-screen">
   
    <AdminHeader />

   
    <div className="flex flex-1">
     
      <AdminSidebar />

      
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 pt-24">
        <Outlet />
      </main>
    </div>

  
    <AdminFooter />
  </div>
);

export default AdminLayout;
