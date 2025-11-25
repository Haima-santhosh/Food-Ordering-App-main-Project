import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // <- use your configured axios instance
import Pagination from "../components/Pagination";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants/view-restaurants"); // <- api instance
        setRestaurants(response.data.restaurants || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((rest) => {
    const matchesSearch =
      rest.restName.toLowerCase().includes(search.toLowerCase()) ||
      rest.cuisineType.toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "All" ||
      rest.cuisineType.toLowerCase() === selectedCuisine.toLowerCase();

    return matchesSearch && matchesCuisine;
  });

  if (loading) return <p className="text-center mt-20">Loading restaurants...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-6 pt-20 pb-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">
            Explore Your Favourite Restaurants
          </h1>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
            <input
              type="text"
              placeholder="Search by restaurant or cuisine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Restaurant Cards */}
          {filteredRestaurants.length === 0 ? (
            <p className="text-center text-gray-500 italic">No restaurants found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredRestaurants.map((rest) => (
                <div
                  key={rest._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all"
                >
                  <img
                    src={rest.image || "/placeholder.jpg"}
                    alt={rest.restName}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold">{rest.restName}</h2>
                    <p className="text-blue-600 dark:text-blue-400">{rest.cuisineType}</p>
                    <p className="italic text-gray-500">📍 {rest.address}</p>
                    <p>💰 Avg Price: ₹{rest.averagePrice}</p>

                    <div className="flex justify-center gap-3 mt-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                        ⭐ {rest.rating?.toFixed(1)}
                      </span>
                      <span>⏱️ {rest.deliveryTime} mins</span>
                    </div>

                    <button
                      className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
                      onClick={() => navigate(`/restaurants/${rest._id}/menu`)}
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
  );
};

export default Restaurants;
