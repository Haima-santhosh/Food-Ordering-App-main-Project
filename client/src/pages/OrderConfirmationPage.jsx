import React from "react";
import orderData from "../data/order";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const order = orderData;
   const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-24 px-4 mt-10 pb-15">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
       
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          🎉 Order Confirmed!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you for your purchase, <span className="font-medium">{order.customerName}</span>!
        </p>

       
        <div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800 mb-2">{order.orderId}</p>

          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-semibold text-gray-800 mb-2">{order.date}</p>

          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-green-600">{order.status}</p>
        </div>

        {/* Delivery Details */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Delivery Address</h3>
          <p className="text-gray-600">{order.deliveryAddress.street}</p>
          <p className="text-gray-600">
            {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
          </p>
        </div>

        {/* Items Ordered */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Items Ordered</h3>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-gray-700 border-b pb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Informations */}
        <div className="border-t pt-3 flex justify-between text-gray-700 font-medium">
          <span>Payment Method:</span>
          <span>{order.paymentMethod}</span>
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between text-lg font-bold text-gray-800">
          <span>Total Amount:</span>
          <span>₹{order.totalAmount}</span>
        </div>

     
     
        <div className="flex justify-center gap-4 mt-6">
           <button
            onClick={() => navigate("/my-orders")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/restaurants")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-all"
          >Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage
