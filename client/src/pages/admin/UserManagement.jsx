import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [profileFile, setProfileFile] = useState(null);

  const API = import.meta.env.VITE_API_URL; // ✅ use env API

  // Fetch all users including admin
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/admin/users`, {
        withCredentials: true,
      });

      setUsers(data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      isActive: user.isActive ?? true,
      profilePic: user.profilePic || "",
    });
    setProfileFile(null);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setFormData({});
    setProfileFile(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") setProfileFile(files[0]);
    else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
    else setFormData({ ...formData, [name]: value });
  };

  // Save updated user
  const saveUser = async (userId) => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined) data.append(key, formData[key]);
      });

      if (profileFile) data.append("profilePic", profileFile);

      await axios.patch(`${API}/admin/update-user/${userId}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      cancelEditing();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API}/admin/delete-user/${userId}`, {
        withCredentials: true,
      });

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Management</h2>

      {loading ? (
        <p className="text-center py-6">Loading users...</p>
      ) : error ? (
        <p className="text-center py-6 text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border-b">Profile</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-all">
                    {/* Profile */}
                    <td className="p-3 border-b">
                      {editingUserId === user._id ? (
                        <input type="file" onChange={handleChange} />
                      ) : user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                          N/A
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="p-3 border-b">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        user.name
                      )}
                    </td>

                    {/* Email */}
                    <td className="p-3 border-b">
                      {editingUserId === user._id ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        user.email
                      )}
                    </td>

                    {/* Role */}
                    <td className="p-3 border-b">
                      {editingUserId === user._id ? (
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="border px-2 py-1 rounded w-full"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3 border-b">
                      {editingUserId === user._id ? (
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                        />
                      ) : user.isActive ? (
                        <span className="text-green-600 font-medium">Active</span>
                      ) : (
                        <span className="text-red-600 font-medium">Blocked</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3 border-b text-center space-x-2">
                      {editingUserId === user._id ? (
                        <>
                          <button
                            onClick={() => saveUser(user._id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(user)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
