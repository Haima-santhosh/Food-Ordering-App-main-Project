import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // Signup API call
      const response = await api.post("/user/user-signup", formData);

      console.log("Signup Response:", response.data);

      // Redirect to sign-in page after successful signup
      navigate("/signin");

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create An Account</h2>
        <p className="text-center text-gray-500 mb-8 mt-4">
          Join <span className="text-xl font-extrabold text-blue-700">Grabbite</span> in Seconds
        </p>

        {error && (
          <div className="text-red-500 text-sm text-center mb-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
