import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignInPage = () => {
  // Access user context methods
  const { signin } = useContext(UserContext);

  // State to store email and password
  const [formData, setFormData] = useState({ email: "", password: "" });

  // For navigation
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!email || !password) {
    setError("All fields are required");
    return;
  }

  setError("");

  // Fetch the stored signup data
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  // Check if user exists and credentials match
  if (storedUser && storedUser.email === email && storedUser.password === password) {
    // includes name, email, password
  signin(storedUser); 
    navigate("/");
  } else {
    setError("Invalid email or password");
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back to{' '}
          <span className="text-blue-700 font-extrabold">Grabbite !!</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
               onChange={handleChange}
             
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
             
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage;
