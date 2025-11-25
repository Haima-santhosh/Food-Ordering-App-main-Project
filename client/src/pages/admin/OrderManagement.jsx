import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/order/all-orders-admin");
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
      alert(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditedStatus(order.status);
  };

  const handleSave = async (id) => {
    try {
      await api.patch(`/order/update-order-admin/${id}`, { status: editedStatus });
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: editedStatus } : order))
      );
      setEditingId(null);
      setEditedStatus("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.delete(`/order/admin/cancel-order/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-700">Loading orders...</div>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Order Management
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
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
            {orders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                  No orders found
                </td>
              </tr>
            )}
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 transition border-b">
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
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.length === 0 && (
          <p className="text-center py-6 text-gray-500 italic">No orders found</p>
        )}
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">#{index + 1}</p>
              <p className="font-medium">{order.userName}</p>
            </div>
            <p>
              <span className="font-semibold">Restaurant:</span> {order.restName}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ₹{order.amount}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.deliveryAddress}
            </p>
            <div className="flex justify-between items-center">
              {editingId === order.id ? (
                <select
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value)}
                  className="border rounded p-1 w-1/2"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <p className="capitalize font-medium">{order.status}</p>
              )}
              <p className="capitalize">{order.paymentMethod}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="capitalize">{order.paymentStatus}</p>
              <div className="flex space-x-2">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
