import axios from "axios";

console.log("🔍 Loaded VITE_API_URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",  // <-- FIXED
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
