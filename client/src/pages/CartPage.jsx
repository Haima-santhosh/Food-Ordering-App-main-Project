import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, clearCart, decreaseQuantity } from "../redux/store";
import axios from "axios";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Update discount and total whenever coupon or cart changes
  useEffect(() => {
    if (coupon) {
      const discount = coupon.discountType === "percent"
        ? Math.round((subtotal * coupon.discount) / 100)
        : coupon.discount;
      setDiscountAmount(discount);
      setTotal(Math.max(subtotal - discount, 0));
    } else {
      setDiscountAmount(0);
      setTotal(subtotal);
    }
  }, [coupon, subtotal]);

  // Fetch available coupons on page load
  useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/coupons/get-coupons`, { withCredentials: true })
    .then((res) => setCoupons(res.data.coupons || []))
    .catch((err) => console.error("Failed to fetch coupons:", err));
}, []);


  // Apply coupon
  const applyCoupon = (c) => {
    if (subtotal < c.minOrderValue) {
      setMessage(`Subtotal must be at least ₹${c.minOrderValue} to use this coupon`);
      setCoupon(null);
      return;
    }
    setCoupon(c);
    setMessage(`Coupon ${c.code} applied!`);
  };

  // Checkout
const handleCheckout = async () => {
  if (!address.trim()) {
    alert("Enter delivery address");
    return;
  }

  if (!cartItems.length) {
    alert("Cart is empty");
    return;
  }

  console.log("Cart before checkout:", cartItems);

  try {
  const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/payment/create-checkout-session`,
  {
    cart: cartItems.map((item) => ({
      itemId: item.itemId || item._id,
      itemName: item.itemName,
      price: item.price,
      image: item.itemImage,
      quantity: item.quantity,
      restId: item.restId,
    })),
    address,
    coupon,
    total,
    restId: cartItems[0].restId,
  },
  { withCredentials: true }
);



    window.location.href = res.data.url;
  } catch (err) {
    console.error("Checkout failed:", err);
    alert(err?.response?.data?.message || "Checkout failed, try again.");
  }
};

    
 
  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-28 bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl mb-4 font-semibold">Your cart is empty</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="empty cart"
          className="w-56 h-56"
        />
        <button
          onClick={() => navigate("/restaurants")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-6 pt-28">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">
        Your Cart
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.itemId || item._id}
              className="flex items-center border p-4 rounded bg-white dark:bg-slate-800"
            >
              <img
                src={item.itemImage || "https://via.placeholder.com/100"}
                alt={item.itemName}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.itemName}</h3>
                <p className="text-gray-600 dark:text-gray-300">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.itemId))}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.itemId))}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center mt-4 space-y-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/restaurants")}
                className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
              >
                Browse Restaurants
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {coupon && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({coupon.code})</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <hr className="my-4 border-gray-300 dark:border-gray-600" />

          {/* Coupons */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Coupons</h4>
            {coupons.length === 0 ? (
              <p className="text-gray-500">No coupons available</p>
            ) : (
              coupons.map((c) => (
                <div
                  key={c._id}
                  className="flex justify-between items-center border p-2 mb-2 rounded bg-slate-50 dark:bg-slate-700"
                >
                  <div>
                    {c.code} - {c.discountType === "percent" ? `${c.discount}%` : `₹${c.discount}`}{" "}
                    <span className="text-sm ml-2">Min ₹{c.minOrderValue}</span>
                  </div>
                  <button
                    onClick={() => applyCoupon(c)}
                    className={`px-3 py-1 rounded text-white ${
                      coupon?._id === c._id ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {coupon?._id === c._id ? "Applied" : "Apply"}
                  </button>
                </div>
              ))
            )}
            {message && <p className="text-green-500 mt-2">{message}</p>}
          </div>

          {/* Delivery Address */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Delivery Address</h4>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              className="w-full border p-2 rounded dark:bg-slate-700"
            />
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
