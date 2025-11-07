import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/store";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(clearCart());
      navigate("/restaurants"); 
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen pt-28 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Checkout
      </h1>

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.itemName} × {item.quantity}
            </span>
            <span>₹{item.price * (item.quantity)}</span>
          </div>
        ))}

        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{totalPrice}</span>
        </div>

     
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full border p-2 rounded mb-4 dark:bg-slate-700"
          />

          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <select className="w-full border p-2 rounded dark:bg-slate-700">
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
          </select>
        </div>

        
        <div className="flex justify-between mt-8">
          <button
            onClick={handleCancelOrder}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel Order
          </button>

         <button
  onClick={() => navigate("/order-confirmation")}
  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Place Order
</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
