import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5173/api"; // fallback for dev

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
