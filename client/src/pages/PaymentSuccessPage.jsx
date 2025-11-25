import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying payment...");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setMessage("No session ID found.");
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment/verify-checkout-session`,
          { sessionId },
          { withCredentials: true }
        );

        if (res.data.message === "Payment successful") {
          setOrder(res.data.order || null);
          setMessage("Payment successful! 🎉");
        } else {
          setMessage("Payment not completed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to verify payment. Contact support.");
      }
    };

    verifyPayment();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {message}
      </h1>

      {order && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Details
          </h2>

          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>

            {order.couponName && (
              <p>
                <strong>Coupon Applied:</strong> {order.couponName}
              </p>
            )}

            <p>
              <strong>Delivery Address:</strong> {order.address}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/")}
              className="flex-1 mr-2 py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate("/my-orders")}
              className="flex-1 ml-2 py-2 px-4 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
