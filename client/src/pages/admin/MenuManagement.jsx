import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    restId: "",
    categoryId: "",
    itemName: "",
    itemDescription: "",
    price: "",
    rating: "",
    itemImage: null,
  });

  // Fetch all menu items
  const fetchMenu = async () => {
    try {
      const { data } = await api.get("/menu/all-menu");
      setMenuItems(data.menus || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch menu items");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    if (!form.restId || !form.categoryId || !form.itemName || !form.price)
      return alert("Fill all required fields");

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => val && data.append(key, val));

    try {
      await api.post("/menu/add-menu", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({
        restId: "",
        categoryId: "",
        itemName: "",
        itemDescription: "",
        price: "",
        rating: "",
        itemImage: null,
      });
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add menu item");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      restId: item.restId?._id || item.restId,
      categoryId: item.categoryId?._id || item.categoryId,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      price: item.price,
      rating: item.rating,
      itemImage: null,
    });
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => val && data.append(key, val));

    try {
      await api.patch(`/menu/update-menu/${editingItem._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update menu item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await api.delete(`/menu/delete-menu/${id}`);
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu item");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Menu Management</h2>

      {/* Add / Edit Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">
          {editingItem ? "Edit Menu Item" : "Add Menu Item"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            name="restId"
            placeholder="Restaurant ID"
            value={form.restId}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="categoryId"
            placeholder="Category ID"
            value={form.categoryId}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={form.itemName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="itemDescription"
            placeholder="Description"
            value={form.itemDescription}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            className="border p-2 rounded"
            step="0.1"
          />
          <input
            type="file"
            name="itemImage"
            onChange={handleChange}
            className="border p-2 rounded col-span-1 md:col-span-2"
          />
        </div>
        <div className="mt-3 flex flex-col md:flex-row gap-2">
          <button
  onClick={editingItem ? handleUpdate : handleAdd}
  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mx-auto w-fit block"
>
  {editingItem ? "Update" : "Add"}
</button>

          {editingItem && (
            <button
              onClick={() => {
                setEditingItem(null);
                setForm({
                  restId: "",
                  categoryId: "",
                  itemName: "",
                  itemDescription: "",
                  price: "",
                  rating: "",
                  itemImage: null,
                });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Restaurant ID</th>
              <th className="px-4 py-2">Category ID</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No menu items found
                </td>
              </tr>
            )}
            {menuItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={item.itemImage || "/placeholder.png"}
                    alt={item.itemName}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{item.restId?._id || item.restId}</td>
                <td className="px-4 py-2">{item.categoryId?._id || item.categoryId}</td>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">{item.rating}⭐</td>
                <td className="px-4 py-2 text-center flex flex-col md:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {menuItems.length === 0 && (
          <p className="text-center py-6 text-gray-500">No menu items found</p>
        )}
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col space-y-2"
          >
            <img
              src={item.itemImage || "/placeholder.png"}
              alt={item.itemName}
              className="w-full h-40 object-cover rounded"
            />
            <p className="font-semibold text-lg">{item.itemName}</p>
            <p>
              <span className="font-semibold">Restaurant:</span>{" "}
              {item.restId?._id || item.restId}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {item.categoryId?._id || item.categoryId}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₹{item.price}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {item.rating}⭐
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

export default MenuManagement;
