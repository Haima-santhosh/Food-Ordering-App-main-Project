import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses Render backend URL
  withCredentials: true,
});

export default api;
