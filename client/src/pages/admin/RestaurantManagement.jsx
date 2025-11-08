import React, { useState } from "react";

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      restName: "Spice Garden",
      rating: 4.5,
      deliveryTime: 30,
      cuisineType: "Indian",
      averagePrice: 400,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      restName: "Pasta Palace",
      rating: 4.2,
      deliveryTime: 25,
      cuisineType: "Italian",
      averagePrice: 350,
      image:
        "https://images.unsplash.com/photo-1600891964360-7e8f8a3a8f3a?auto=format&fit=crop&w=500&q=80",
    },
  ]);

  const [formData, setFormData] = useState({
    restName: "",
    rating: "",
    deliveryTime: "",
    cuisineType: "",
    averagePrice: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle create / update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // update
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, ...formData } : r
        )
      );
      setEditingId(null);
    } else {
      // create
      const newRest = { id: Date.now(), ...formData };
      setRestaurants([...restaurants, newRest]);
    }

    // reset form
    setFormData({
      restName: "",
      rating: "",
      deliveryTime: "",
      cuisineType: "",
      averagePrice: "",
      image: "",
    });
  };

  // edit restaurant
  const handleEdit = (r) => {
    setEditingId(r.id);
    setFormData(r);
  };

  // delete restaurant
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants(restaurants.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Restaurant Management
      </h2>

    
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-10"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          {editingId ? "Edit Restaurant" : "Add New Restaurant"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="restName"
            placeholder="Restaurant Name"
            value={formData.restName}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="deliveryTime"
            placeholder="Delivery Time (mins)"
            value={formData.deliveryTime}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add Restaurant"}
        </button>
      </form>

    
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">Image</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Cuisine</th>
              <th className="p-3 border-b">Rating</th>
              <th className="p-3 border-b">Delivery</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No restaurants available
                </td>
              </tr>
            ) : (
              restaurants.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border-b">
                    <img
                      src={r.image}
                      alt={r.restName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 border-b font-medium">{r.restName}</td>
                  <td className="p-3 border-b">{r.cuisineType}</td>
                  <td className="p-3 border-b">{r.rating || "-"}</td>
                  <td className="p-3 border-b">{r.deliveryTime} min</td>
                  <td className="p-3 border-b">₹{r.averagePrice}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
