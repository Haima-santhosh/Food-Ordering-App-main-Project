import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const sampleUsers = [
      {
        _id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "user",
        isActive: true,
      },
      {
        _id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "admin",
        isActive: false,
      },
    ];
    setUsers(sampleUsers);
  }, []);

  // Toggle active status
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  // Edit user 
  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center pb-5">User Management</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
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
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b capitalize">{user.role}</td>
                  <td className="p-3 border-b">
                    {user.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Blocked</span>
                    )}
                  </td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      className={`px-3 py-1 rounded-md text-white ${
                        user.isActive
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.isActive ? "Block" : "Unblock"}
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
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

export default UserManagement;
