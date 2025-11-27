import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    restName: "",
    rating: "",
    deliveryTime: "",
    cuisineType: "",
    averagePrice: "",
    address: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all restaurants
  const loadRestaurants = async () => {
    try {
      const res = await api.get("/restaurants/all-restaurants");
      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      console.error("Failed to load restaurants", err);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    if (editingId) {
      await api.patch(`/restaurants/update-restaurant/${editingId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } else {
      await api.post("/restaurants/add-restaurants", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    await loadRestaurants();

    setFormData({
      restName: "",
      rating: "",
      deliveryTime: "",
      cuisineType: "",
      averagePrice: "",
      address: "",
      image: null,
    });

    setEditingId(null);
  } catch (err) {
    console.error("Save failed", err);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (restaurant) => {
    setEditingId(restaurant._id);
    setFormData({
      restName: restaurant.restName,
      rating: restaurant.rating,
      deliveryTime: restaurant.deliveryTime,
      cuisineType: restaurant.cuisineType,
      averagePrice: restaurant.averagePrice,
      address: restaurant.address,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
    try {
      await api.delete(`/restaurants/delete-restaurant/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4 md:p-6 pt-28 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">Restaurant Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 shadow-md rounded-lg max-w-4xl mx-auto mb-10"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Restaurant" : "Add New Restaurant"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="restName"
            placeholder="Restaurant Name"
            value={formData.restName}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="deliveryTime"
            placeholder="Delivery Time (mins)"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <select
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Cuisine</option>
            <option>Indian</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>Mexican</option>
            <option>Japanese</option>
            <option>North Indian</option>
            <option>Mediterranean</option>
            <option>American</option>
          </select>
          <input
            type="number"
            name="averagePrice"
            placeholder="Average Price"
            value={formData.averagePrice}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border p-2 rounded w-full col-span-1 sm:col-span-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded w-full md:w-auto"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add"}
        </button>
      </form>

     
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Image</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Cuisine</th>
              <th className="p-3 border-b">Rating</th>
              <th className="p-3 border-b">Delivery</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No restaurants found
                </td>
              </tr>
            ) : (
              restaurants.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.restName}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 border-b">{item.restName}</td>
                  <td className="p-3 border-b">{item.cuisineType}</td>
                  <td className="p-3 border-b">{item.rating}</td>
                  <td className="p-3 border-b">{item.deliveryTime} min</td>
                  <td className="p-3 border-b">₹{item.averagePrice}</td>
                  <td className="p-3 border-b">{item.address}</td>
                  <td className="p-3 border-b text-center space-x-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      <div className="md:hidden space-y-4">
        {restaurants.length === 0 && (
          <p className="text-center py-6 text-gray-500">No restaurants found</p>
        )}
        {restaurants.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2"
          >
            <img
              src={item.image || "/placeholder.png"}
              alt={item.restName}
              className="w-full h-40 object-cover rounded"
            />
            <p className="font-semibold text-lg">{item.restName}</p>
            <p>
              <span className="font-semibold">Cuisine:</span> {item.cuisineType}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {item.rating}
            </p>
            <p>
              <span className="font-semibold">Delivery:</span> {item.deliveryTime} min
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₹{item.averagePrice}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {item.address}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-500 text-white rounded flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantManagement;
