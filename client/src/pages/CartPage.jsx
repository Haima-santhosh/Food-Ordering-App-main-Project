import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, clearCart, decreaseQuantity } from "../redux/store";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-28 bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl mb-4 font-semibold">Your cart is empty</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty cart"
          className="w-56 h-56 object-contain"
        />
        <button
          onClick={() => navigate("/restaurants")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-6 pt-28">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">
        Your Shopping Cart
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center border p-4 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <img
                src={item.itemImage || "https://via.placeholder.com/100"}
                alt={item.itemName}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.itemId))}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.itemId))}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <hr className="my-2 border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>

     
      <div className="flex justify-center gap-4 mt-8 mb-8">
        <button
          onClick={() => navigate("/restaurants")}
          className="p-3 bg-blue-700 text-white rounded-md hover:bg-blue-600"
        >
          Browse Restaurants
        </button>
        <button
          onClick={() => navigate("/")}
          className="p-3 bg-blue-700 text-white rounded-md hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default CartPage;
