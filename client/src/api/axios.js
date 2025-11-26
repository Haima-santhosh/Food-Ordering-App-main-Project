import axios from "axios";

const api = axios.create({
  baseURL: "https://food-ordering-app-main-project.onrender.com/api", // <-- your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you need cookies/session
});

export default api;
