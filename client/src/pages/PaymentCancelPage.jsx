import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-4">Payment was cancelled.</h1>
      <p className="text-gray-600 mb-4">You can try again or continue shopping.</p>
      <button
        onClick={() => navigate("/cart")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default PaymentCancelPage;
