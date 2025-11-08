import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      userName: "John Doe",
      restName: "Spice Villa",
      amount: 1200,
      deliveryAddress: "123, MG Road, Bangalore",
      status: "pending",
      paymentStatus: "unpaid",
      paymentMethod: "cod",
    },
    {
      id: 2,
      userName: "Sara Lee",
      restName: "Taco Town",
      amount: 950,
      deliveryAddress: "56, Green Park, Delhi",
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "online",
    },
    {
      id: 3,
      userName: "David Smith",
      restName: "Pizza Point",
      amount: 670,
      deliveryAddress: "12, High Street, Mumbai",
      status: "preparing",
      paymentStatus: "paid",
      paymentMethod: "online",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePaymentChange = (id, newPayment) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, paymentStatus: newPayment } : order
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

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
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border rounded p-1 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

             
                <td className="p-3">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentChange(order.id, e.target.value)
                    }
                    className="border rounded p-1 bg-white"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </td>

                <td className="p-3 capitalize">{order.paymentMethod}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 italic"
                >
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
