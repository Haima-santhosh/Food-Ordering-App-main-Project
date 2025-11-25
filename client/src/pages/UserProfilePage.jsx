import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserProfilePage = () => {
  const { user, signin } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
    address: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/user-profile`,
          { withCredentials: true }
        );

        const u = data.user;
        setProfile({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          profilePic: u.profilePic || "",
          address: u.address || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert("Failed to load profile");
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Please sign in to view your profile.
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleEdit = () => setEditMode(!editMode);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      if (file) formData.append("profilePic", file);

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update-user`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      signin(data.user);
      setProfile(data.user);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6 pt-28">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-md object-cover"
          />
        </div>

        {!editMode ? (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <p className="text-sm text-gray-500">{profile.phone}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">{profile.address}</p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={toggleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
              >
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-500">Profile Picture</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div>
              <label className="block text-gray-500">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-500">Email</label>
              <input
                type="text"
                name="email"
                value={profile.email}
                disabled
                className="w-full border rounded-lg p-2 mt-1 bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-gray-500">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-500">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
              >
                Save
              </button>
              <button
                onClick={toggleEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
