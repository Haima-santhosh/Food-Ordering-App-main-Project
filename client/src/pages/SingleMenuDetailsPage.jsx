import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import menuData from "../data/menu";
import restaurants from "../data/restaurant";
import CartButton from "../components/CartButton";

const SingleMenuDetailsPage = () => {
  const { restId, itemId } = useParams(); // ✅ use both
  const navigate = useNavigate();

  // checking match by both restaurant and item IDs
  const menuItem = menuData.find(
  (item) =>
    String(item.itemId) === String(itemId) &&
    String(item.restId) === String(restId)
);


  if (!menuItem) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-red-600">
        Dish not found 🍽️
      </div>
    );
  }

  //  Find the restaurant details
  const restaurant = restaurants.find(
    (rest) => rest.restId === menuItem.restId
  );

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-28  px-4 sm:px-6 md:px-10 text-gray-900 dark:text-white transition-colors duration-300">

      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-10 ">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10 border-b border-gray-300 dark:border-slate-600 pb-6 ">
          Explore Your Favourite Dishes 🍛
        </h2>
      {/* Menu iten details Card */}
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
           

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {menuItem.itemDescription}
            </p>
             {/* Category from Menu */}
            {menuItem.category && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
              🥄 Category: <span className="font-medium">{menuItem.category}</span>
              </p>
            )}

            {/* Cuisine type from Restaurant */}
            {restaurant && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🍽️ Cuisine: <span className="font-medium">{restaurant.cuisineType}</span>
              </p>
            )}

            <p className="text-xl text-green-600 font-bold">
              ₹{menuItem.price}
            </p>

            <p className="text-yellow-500 font-medium">
              ⭐ {menuItem.rating} / 5
            </p>

           

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
              <CartButton />
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuDetailsPage;
