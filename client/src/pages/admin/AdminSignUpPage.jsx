import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Mock signup data:", formData);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Redirect to Sign-in page after successful signup
    navigate("/admin/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Sign Up
        </h2>

        {error && (
          <p className="text-center mb-4 font-medium text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/admin/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUpPage;
