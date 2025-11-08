import React, { useState } from "react";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      _id: 1,
      restName: "Taj Spice Hub",
      categoryName: "Main Course",
      itemName: "Butter Chicken",
      itemImage: "https://via.placeholder.com/80",
      itemDescription: "Rich creamy butter chicken with Indian spices.",
      price: 320,
      rating: 4.5,
    },
    {
      _id: 2,
      restName: "Green Bowl",
      categoryName: "Salad",
      itemName: "Caesar Salad",
      itemImage: "https://via.placeholder.com/80",
      itemDescription: "Fresh lettuce, parmesan, and Caesar dressing.",
      price: 180,
      rating: 4.2,
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    restName: "",
    categoryName: "",
    itemName: "",
    itemImage: "",
    itemDescription: "",
    price: "",
    rating: "",
  });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newItem.itemName || !newItem.price) return alert("Fill all fields");
    setMenuItems([
      ...menuItems,
      { ...newItem, _id: Date.now(), itemImage: newItem.itemImage || "https://via.placeholder.com/80" },
    ]);
    setNewItem({
      restName: "",
      categoryName: "",
      itemName: "",
      itemImage: "",
      itemDescription: "",
      price: "",
      rating: "",
    });
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item._id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    setMenuItems(
      menuItems.map((i) => (i._id === editingItem._id ? editingItem : i))
    );
    setEditingItem(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center pb-5">
        Menu Management
      </h2>

      
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-600">Add Menu Item</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="restName"
            placeholder="Restaurant Name"
            value={newItem.restName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="categoryName"
            placeholder="Category"
            value={newItem.categoryName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="itemImage"
            placeholder="Image URL"
            value={newItem.itemImage}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newItem.rating}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Restaurant</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) =>
              editingItem && editingItem._id === item._id ? (
                <tr key={item._id} className="bg-yellow-50">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="itemImage"
                      value={editingItem.itemImage}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          itemImage: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="restName"
                      value={editingItem.restName}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          restName: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="categoryName"
                      value={editingItem.categoryName}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          categoryName: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="itemName"
                      value={editingItem.itemName}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          itemName: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="price"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          price: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      name="rating"
                      value={editingItem.rating}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          rating: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{item.restName}</td>
                  <td className="px-4 py-2">{item.categoryName}</td>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">₹{item.price}</td>
                  <td className="px-4 py-2">{item.rating}⭐</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;
