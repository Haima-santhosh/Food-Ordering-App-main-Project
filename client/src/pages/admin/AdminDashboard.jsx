import React from "react";
import SalesChart from "../../utils/SalesChart";


const AdminDashboardPage = () => {
  return (
    <div className=" bg-white dark:bg-slate-900 min-h-screen p-6 pt-28">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {" "}
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-base font-medium text-gray-600 dark:text-gray-300">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            120+
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-base font-medium text-gray-600 dark:text-gray-300">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            12,2960
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-base font-medium text-gray-600 dark:text-gray-300">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            53,208
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-base font-medium text-gray-600 dark:text-gray-300">
            Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            ₹12,34,864
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow h-64 overflow-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Recent Orders
          </h3>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">#1001</td>
                <td>John Doe</td>
                <td>₹1,499</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">#1002</td>
                <td>Jane Smith</td>
                <td>₹680</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">#1003</td>
                <td>Alice Patrick</td>
                <td>₹2860</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;