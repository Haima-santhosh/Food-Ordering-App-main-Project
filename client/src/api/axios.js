// src/api/axios.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://food-ordering-app-main-project.onrender.com/api"
      : "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json", // default for JSON requests
  },
  withCredentials: true, // required for cookies/session auth
});

// Helper for JSON requests (POST, PUT, PATCH)
export const sendJSON = async (url, data, method = "post") => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Helper for file uploads (FormData)
export const sendFormData = async (url, formData, method = "post") => {
  try {
    const response = await api({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export default api;
