import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext"; 
import userProfile from "../data/profile"; 

const UserProfilePage = () => {

  //get user from context
  const { user } = useContext(UserContext); 


  const [profile, setProfile] = useState({ ...userProfile, name: "", email: "" });
  const [editMode, setEditMode] = useState(false);

  // When user sign in, merge context user data 
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "pincode"].includes(name)) {
      setProfile({ ...profile, address: { ...profile.address, [name]: value } });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const toggleEdit = () => setEditMode(!editMode);

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6 pt-28">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic}
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
              <p className="text-gray-600 text-sm">
                {profile.address.street}, {profile.address.city} -{" "}
                {profile.address.pincode}
              </p>
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
          
          
         {/* Edit Form */}

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
              <label className="block text-gray-500">Street</label>
              <input
                type="text"
                name="street"
                value={profile.address.street}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-500">City</label>
                <input
                  type="text"
                  name="city"
                  value={profile.address.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-500">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={profile.address.pincode}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-1 focus:ring-blue-400"
                />
              </div>
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
