import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import menuData from "../data/menu";
import restaurantsData from "../data/restaurant";
import Pagination from "../components/Pagination";
import CartButton from "../components/CartButton";

const MenuPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const restaurant = restaurantsData.find(
    (rest) => rest.restId === parseInt(restId)
  );

  const filteredMenu = menuData
    .filter(
      (item) =>
        item.restId === parseInt(restId) &&
        item.itemName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <>
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 pt-20 pb-10 mt-10">
      <div className="max-w-7xl mx-auto">
       
        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 rounded-lg shadow-md p-6 mb-10">
          Enjoy Your Favourite Dishes From {restaurant ? restaurant.restName : "Restaurant"} 
        </h1>

        {/* Search by Favourite Dishes */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search your favorite dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
         
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all"
          >
            ← Back to Restaurants
          </button>
        </div>
        {/* Sort By Price and Rating */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Sort By</option>
            <option value="price">Low Price</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Menu Cards */}
        {filteredMenu.length === 0 ? (
  <p className="text-center text-gray-500 dark:text-gray-400">
    No menu items found 🍔🌯
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {filteredMenu.map((item) => (
      <div
        key={item.itemId}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
        hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 border-gray-200 border-2"
      >
     <div className="p-2">
  <div className="rounded-t-lg overflow-hidden">
    <img
      src={item.itemImage}
      alt={item.itemName}
      className="w-full h-44 object-cover"
    />
  </div>
</div>




        <div className="p-5 text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {item.itemName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 italic">
            {item.category}
          </p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-green-600 font-bold text-md">
              ₹{item.price}
            </span>
            <span className="text-black px-2 py-1 rounded-md text-sm font-semibold">
              ⭐ {item.rating}
            </span>
          </div>

          <div className="flex justify-center gap-3">

            <CartButton item={item} />

            <button
  onClick={() => navigate(`/restaurants/${restId}/menu/${item.itemId}`)}
  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all"
>
  View Details
</button>

          </div>
        </div>
      </div>
    ))}
  </div>
)}

        
      </div>
    </div>
    <Pagination />
    </>
  );
};

export default MenuPage;
