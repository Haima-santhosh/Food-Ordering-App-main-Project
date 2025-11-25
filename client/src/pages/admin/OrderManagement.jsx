import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // 🔥 BASE URL FROM .env

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API}/order/all-orders-admin`,
        { withCredentials: true }
      );

      const mappedOrders = data.order.map((order) => ({
        id: order._id,
        userName: order.userId?.name || "N/A",
        restName: order.restId?.restName || "N/A",
        amount: order.amount,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
      }));

      setOrders(mappedOrders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Start editing
  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditedStatus(order.status);
  };

  // Save updated status
  const handleSave = async (id) => {
    try {
      await axios.patch(
        `${API}/order/update-order-admin/${id}`,
        { status: editedStatus },
        { withCredentials: true }
      );

      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: editedStatus } : order
        )
      );

      setEditingId(null);
      setEditedStatus("");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Cancel (Delete) order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(
        `${API}/order/admin/cancel-order/${id}`,
        { withCredentials: true }
      );

      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Order Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left border-collapse text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">User</th>
              <th className="p-3 border-b">Restaurant</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Payment</th>
              <th className="p-3 border-b">Method</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition border-b"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{order.userName}</td>
                <td className="p-3">{order.restName}</td>
                <td className="p-3 font-semibold">₹{order.amount}</td>
                <td className="p-3">{order.deliveryAddress}</td>
                <td className="p-3">
                  {editingId === order.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="border rounded p-1 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className="capitalize">{order.status}</span>
                  )}
                </td>
                <td className="p-3 capitalize">{order.paymentStatus}</td>
                <td className="p-3 capitalize">{order.paymentMethod}</td>

                <td className="p-3 text-center flex justify-center gap-2">
                  {editingId === order.id ? (
                    <>
                      <button
                        onClick={() => handleSave(order.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(order)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
