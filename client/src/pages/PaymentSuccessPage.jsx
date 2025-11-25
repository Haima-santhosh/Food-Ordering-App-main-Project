import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // optional icon for success

const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return navigate("/cart");

      try {
        const res = await api.post("/payment/verify-checkout-session", { sessionId });
        setOrder(res.data.order);
      } catch (err) {
        console.error("Payment verification failed", err);
        alert(err?.response?.data?.message || "Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Verifying your payment...</p>
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900">
        <p className="text-lg text-red-600">No order found. Please try again.</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your order has been placed successfully.
        </p>

        <div className="text-left space-y-2 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <p>
            <span className="font-semibold">Order ID:</span> {order.orderId}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ₹{order.totalAmount}
          </p>
          <p>
            <span className="font-semibold">Delivery Address:</span> {order.address}
          </p>
          <p>
            <span className="font-semibold">Coupon Applied:</span> {order.couponName || "None"}
          </p>
        </div>

        <button
          onClick={() => navigate("/restaurants")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
