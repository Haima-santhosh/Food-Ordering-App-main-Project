import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const MyOrdersPage = () => {
  

  // sample orders data
  const navigate = useNavigate();

  // Convert orders to state so we can update them
  const [orders, setOrders] = useState([
    {
      id: 1,
      restaurant: "Pizza Palace",
      items: ["Margherita Pizza", "Coke"],
      total: 450,
      status: "Delivered",
    },
    {
      id: 2,
      restaurant: "Sushi House",
      items: ["Salmon Roll", "Miso Soup"],
      total: 700,
      status: "Preparing",
    },
    {
      id: 3,
      restaurant: "Burger Hub",
      items: ["Cheeseburger", "Fries", "Pepsi"],
      total: 350,
      status: "Cancelled",
    },
  ]);

  const cancelOrder = (orderId) => {
    alert(`Order ${orderId} cancelled!`);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 pt-20 pb-10 mt-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 rounded-lg shadow-md p-6 mb-10">
        My Orders
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-700">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{order.restaurant}</h2>
                <p className="text-gray-600">
                  Items: {order.items.join(", ")}
                </p>
                <p className="text-gray-600">Total: ₹{order.total}</p>
                <p
                  className={`mt-1 font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>

              {/* cancel button, if order is not delivered or cancelled */}
              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/restaurants")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Browse Restaurants
        </button>
      </div>
    </div>
  );
};

export default MyOrdersPage;
