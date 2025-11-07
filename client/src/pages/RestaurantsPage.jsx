import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurantsData from "../data/restaurant";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const navigate = useNavigate();

  const cuisines = [
    "All",
    "Indian",
    "Italian",
    "Chinese",
    "Mexican",
    "Japanese",
    "North Indian",
    "Mediterranean",
    "American",
  ];

  // Search by restaurant or cuisine name
  const restaurants = restaurantsData.filter((rest) => {
    const restaurantSearch = rest.restName
      .toLowerCase()
      .includes(search.toLowerCase());
    const cuisineSearch = rest.cuisineType
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      selectedCuisine === "All" || rest.cuisineType === selectedCuisine;
    return (restaurantSearch || cuisineSearch) && matchesFilter;
  });

  return (
    <>
   

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 pt-20 pb-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-blue-700 dark:text-blue-300 rounded-lg shadow-lg p-4 mb-10">
            Explore Your Favourite Restaurants
          </h1>

          {/* Search By Restaurant Name or Cuisine Type */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <input
              type="text"
              placeholder="Search by Restaurant or Cuisine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

           {/* Restaurant Cards */}
          {restaurants.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg italic">
              No restaurants found 🍽️
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {restaurants.map((rest) => (
                <div
                  key={rest.restId}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                   <div className="p-2">
                   <div className="rounded-t-lg overflow-hidden">
                    
                    <img
                      src={rest.image}
                      alt={rest.restName}
                      className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  </div>
                  <div className="p-6 flex flex-col items-center text-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                      {rest.restName}
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                      {rest.cuisineType}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 italic">
                      📍 {rest.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      💰 Avg Price: ₹{rest.averagePrice}
                    </p>

                    <div className="flex justify-center items-center gap-3 mb-4">
                      <span className="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                        ⭐ {rest.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ⏱️ {rest.deliveryTime} mins
                      </span>
                    </div>

                    <button
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        navigate(`/restaurants/${rest.restId}/menu`)
                      }
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Pagination />
  
    </>
  )
}

export default Restaurants;
