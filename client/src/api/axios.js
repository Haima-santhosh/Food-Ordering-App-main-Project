// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://food-ordering-app-main-project-server.onrender.com/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable if using cookies/session auth
});

export default api;
