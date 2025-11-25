import axios from "axios";

// Base URL points to the environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // VITE_API_URL set per environment
  withCredentials: true,  // important for sessions/cookies
});

export default api;
