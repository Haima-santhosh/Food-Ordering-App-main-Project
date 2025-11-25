import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null); // FIXED typo

  // UPDATED API URL FROM ENV
  const API_URL = `${import.meta.env.VITE_API_URL}/category`;

  // Load all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/all-categories`, {
        withCredentials: true,
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/update-category/${editingId}`,
          { categoryName: name },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${API_URL}/add-category`,
          { categoryName: name },
          { withCredentials: true }
        );
      }
      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Edit category
  const editCategory = (cat) => {
    setEditingId(cat._id);
    setName(cat.categoryName);
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${API_URL}/delete-category/${id}`, {
        withCredentials: true,
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">Category Management</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-10"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <div className="max-w-3xl mx-auto bg-white rounded shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{cat.categoryName}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => editCategory(cat)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
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

export default CategoryManagement;
