import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Samuel Johnson",
    email: "sam.admin@grabbite.com",
    role: "admin",
    profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState(admin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdmin({ ...updatedAdmin, [name]: value });
  };

  const handleSave = () => {
    setAdmin(updatedAdmin);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
        
      
        <div className="relative flex justify-center mb-4">
          <img
            src={updatedAdmin.profilePic}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-md object-cover"
          />
        </div>

        
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          {admin.name}
        </h2>
        <p className="text-gray-500 mb-4 capitalize">{admin.role}</p>

       
        <div className="text-left space-y-3 mb-6">
       
          <div>
            <p className="text-sm font-semibold text-gray-600">Name</p>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedAdmin.name}
                onChange={handleChange}
                className="border rounded-md w-full px-3 py-2 mt-1 text-gray-700 focus:ring-2 focus:ring-yellow-400"
              />
            ) : (
              <p className="text-gray-800">{admin.name}</p>
            )}
          </div>

         
          <div>
            <p className="text-sm font-semibold text-gray-600">Email</p>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedAdmin.email}
                onChange={handleChange}
                className="border rounded-md w-full px-3 py-2 mt-1 text-gray-700 focus:ring-2 focus:ring-yellow-400"
              />
            ) : (
              <p className="text-gray-800">{admin.email}</p>
            )}
          </div>

       
          {editMode && (
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Profile Picture URL
              </p>
              <input
                type="text"
                name="profilePic"
                value={updatedAdmin.profilePic}
                onChange={handleChange}
                className="border rounded-md w-full px-3 py-2 mt-1 text-gray-700 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}
        </div>

      
        <div className="flex justify-center space-x-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md shadow-md transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md shadow-md transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md shadow-md transition-all"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
