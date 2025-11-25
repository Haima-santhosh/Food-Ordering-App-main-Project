import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://food-ordering-app-main-project.onrender.com/api
  withCredentials: true, // important for cookies/session
});

export default api;
