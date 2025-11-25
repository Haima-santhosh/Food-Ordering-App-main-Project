import React, { useState, useEffect } from "react";

 import api from "../../api/axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState({});
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin profile
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/admin-profile");
        setAdmin(res.data.admin);
        setUpdatedAdmin(res.data.admin);
      } catch (err) {
        alert("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!admin) return <p className="text-center py-6">No admin data</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setProfileFile(files[0]);
    } else {
      setUpdatedAdmin({ ...updatedAdmin, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", updatedAdmin.name);
      formData.append("email", updatedAdmin.email);
      if (profileFile) formData.append("profilePic", profileFile);

      const res = await api.patch("/admin/update-admin", formData);

      setAdmin(res.data.admin);
      setUpdatedAdmin(res.data.admin);
      setProfileFile(null);
      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md text-center">
        <img
          src={profileFile ? URL.createObjectURL(profileFile) : updatedAdmin.profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">{admin.name}</h2>
        <p className="text-gray-500 mb-4">Role : {admin.role}</p>

        <div className="mb-4 text-left space-y-2">
          <div>
            <p className="text-sm font-medium">Name</p>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedAdmin.name}
                onChange={handleChange}
                className="border w-full px-2 py-1 rounded"
              />
            ) : (
              <p>{admin.name}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium">Email</p>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedAdmin.email}
                onChange={handleChange}
                className="border w-full px-2 py-1 rounded"
              />
            ) : (
              <p>{admin.email}</p>
            )}
          </div>

          {editMode && (
            <div>
              <p className="text-sm font-medium">Profile Picture</p>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="border w-full px-2 py-1 rounded"
              />
            </div>
          )}
        </div>

        {editMode ? (
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setUpdatedAdmin(admin);
                setProfileFile(null);
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-yellow-400 text-white rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
