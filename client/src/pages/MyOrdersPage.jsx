import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // use the shared axios instance

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/my-orders");
        setOrders(res.data.order || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await api.delete(`/order/cancel-order/${orderId}`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      alert("Order cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-700 text-lg">You have no orders yet.</p>
        <button
          onClick={() => navigate("/restaurants")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-6 pt-20 pb-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        My Orders
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-gray-600">
                  Restaurant: {order.restId?.restName || "Unknown"}
                </p>
              </div>

              {order.status !== "delivered" && order.status !== "cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 text-white text-md px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {order.items.map((item) => (
                <div
                  key={item.itemId?._id}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <img
                    src={item.itemId?.itemImage}
                    alt={item.itemId?.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">
                      {item.itemId?.itemName || "Unknown"}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="font-semibold">Total: ₹{order.amount}</p>
              <p
                className={`font-medium ${
                  order.status === "delivered"
                    ? "text-green-600"
                    : order.status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {order.status}
              </p>
            </div>
          </div>
        ))}
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
