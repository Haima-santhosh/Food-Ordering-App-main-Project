import React, { useState, useEffect } from "react";
import axios from "axios";

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    restName: "",
    rating: "",
    deliveryTime: "",
    cuisineType: "",
    averagePrice: "",
    address: "",
    image: undefined,
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Load restaurant list
  // ---------------------------
  const loadRestaurants = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/restaurants/view-restaurants`,
        { withCredentials: true }
      );

      setRestaurants(response.data.restaurants || []);
    } catch (err) {
      console.log("Unable to load restaurants", err);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  // ---------------------------
  // Input handler
  // ---------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ---------------------------
  // Add or update restaurant
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sendData = new FormData();
      sendData.append("restName", formData.restName);
      sendData.append("rating", formData.rating || 0);
      sendData.append("deliveryTime", formData.deliveryTime);
      sendData.append("cuisineType", formData.cuisineType);
      sendData.append("averagePrice", formData.averagePrice);
      sendData.append("address", formData.address);

      if (formData.image) {
        sendData.append("image", formData.image);
      }

      if (editingId) {
        // UPDATE RESTAURANT
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/restaurants/update-restaurant/${editingId}`,
          sendData,
          { withCredentials: true }
        );
      } else {
        // ADD RESTAURANT
        await axios.post(
          `${import.meta.env.VITE_API_URL}/restaurants/add-restaurants`,
          sendData,
          { withCredentials: true }
        );
      }

      await loadRestaurants();

      // Reset form
      setFormData({
        restName: "",
        rating: "",
        deliveryTime: "",
        cuisineType: "",
        averagePrice: "",
        address: "",
        image: undefined,
      });
      setEditingId(null);
    } catch (err) {
      console.log("Saving failed", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Set data for editing
  // ---------------------------
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      restName: item.restName,
      rating: item.rating,
      deliveryTime: item.deliveryTime,
      cuisineType: item.cuisineType,
      averagePrice: item.averagePrice,
      address: item.address,
      image: undefined,
    });
  };

  // ---------------------------
  // Delete a restaurant
  // ---------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/restaurants/delete-restaurant/${id}`,
        { withCredentials: true }
      );

      setRestaurants((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">Restaurant Management</h2>

      {/* -------------------- FORM -------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg max-w-3xl mx-auto mb-10"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Restaurant" : "Add New Restaurant"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="restName"
            placeholder="Restaurant Name"
            value={formData.restName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="deliveryTime"
            placeholder="Delivery Time (mins)"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <select
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            required
            className="border p-2 rounded"
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
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* -------------------- TABLE -------------------- */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
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
                      src={item.image}
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
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 mb-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
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
    </div>
  );
};

export default RestaurantManagement;
