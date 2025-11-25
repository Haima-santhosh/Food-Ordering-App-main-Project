import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Render backend
  withCredentials: true, // send cookies
});

export default api;
