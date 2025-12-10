import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import api from "../api/axios";

const SignUpPage = () => {
  const { signin } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", profilePic: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (formData.profilePic) form.append("profilePic", formData.profilePic);

      const response = await api.post("/user/user-signup", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      signin(response.data.user); // auto-login
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your <span className="text-blue-700 font-extrabold">Account</span>
        </h2>
        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account? <Link to="/signin" className="text-blue-600 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
