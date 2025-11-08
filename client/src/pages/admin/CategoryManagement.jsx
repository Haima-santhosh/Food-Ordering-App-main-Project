import React, { useState } from "react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, categoryName: "Indian" },
    { id: 2, categoryName: "Chinese" },
    { id: 3, categoryName: "Italian" },
  ]);

  const [formData, setFormData] = useState({ categoryName: "" });
  const [editingId, setEditingId] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({ categoryName: e.target.value });
  };

  // handle create and update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, categoryName: formData.categoryName } : cat
        )
      );
      setEditingId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        categoryName: formData.categoryName,
      };
      setCategories([...categories, newCategory]);
    }

    setFormData({ categoryName: "" });
  };

  // handle edit
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({ categoryName: cat.categoryName });
  };

  // handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Category Management
      </h2>

   
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-10"
      >
        <h3 className="text-lg font-medium mb-4 text-gray-700 text-center">
          {editingId ? "Edit Category" : "Add New Category"}
        </h3>

        <input
          type="text"
          name="categoryName"
          placeholder="Enter category name"
          value={formData.categoryName}
          onChange={handleChange}
          className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

    
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Category Name</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b font-medium">
                    {cat.categoryName}
                  </td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
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
