import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // <- use your axios instance
import CartButton from "../components/CartButton";

const SingleMenuDetailsPage = () => {
  const { restId, itemId } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // LOAD MENU LIST → Filter One Item
  useEffect(() => {
    const loadMenuItem = async () => {
      try {
        const res = await api.get("/menu/get-menu"); // <- use api
        const item = res.data.menu.find(
          (m) => String(m.itemId) === String(itemId) && String(m.restId) === String(restId)
        );

        setMenuItem(item || null);
      } catch (err) {
        console.log("Error fetching menu item:", err);
      }
    };

    loadMenuItem();
  }, [restId, itemId]);

  // LOAD FULL DETAILS OF SINGLE ITEM
  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await api.get(`/menu/get-menu-details/${itemId}`); // <- use api
        setMenuItem(res.data.menu || null);
        setRestaurant(res.data.restaurant || null);
      } catch (err) {
        console.log("Error fetching menu item details:", err);
      }
    };

    loadDetails();
  }, [itemId]);

  // SUBMIT REVIEW
  const submitReview = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      return alert("Please fill all fields");
    }

    try {
      await api.post("/review/add-review", {
        itemId,
        restId,
        rating: Number(rating),
        comment,
      });

      setRating("");
      setComment("");
      alert("Review added");
    } catch (err) {
      console.log(err);
      alert("Failed to add review");
    }
  };

  if (!menuItem) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-red-600">
        Dish not found 🍽️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-28 px-4 sm:px-6 md:px-10 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10 border-b border-gray-300 dark:border-slate-600 pb-6">
          Explore Your Favourite Dishes 🍛
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={menuItem.itemImage}
              alt={menuItem.itemName}
              className="w-72 h-72 object-cover rounded-lg shadow-md border border-gray-200 dark:border-slate-700"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h3 className="text-2xl font-semibold">{menuItem.itemName}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{menuItem.itemDescription}</p>

            {menuItem.category && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🥄 Category: <span className="font-medium">{menuItem.category}</span>
              </p>
            )}

            {restaurant && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🍽️ Cuisine: <span className="font-medium">{restaurant.cuisineType}</span>
              </p>
            )}

            <p className="text-xl text-green-600 font-bold">₹{menuItem.price}</p>

            <p className="text-yellow-500 font-medium">⭐ {menuItem.rating} / 5</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
              <CartButton item={menuItem} />
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-12 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-600 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">Add A Review</h3>

          <form onSubmit={submitReview} className="space-y-5">
            <div className="flex flex-col">
              <span className="text-md mb-2 font-medium text-gray-700 dark:text-gray-300">
                Rating
              </span>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none"
                placeholder="Give Your Rating"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-md mb-2 font-medium text-gray-700 dark:text-gray-300">
                Your Review
              </span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none"
                rows="3"
                placeholder="Share your experience..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium shadow hover:opacity-90 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuDetailsPage;
