import axios from "axios";

const API_BASE_URL = "https://movie-booking-bxks.onrender.com/api"; // Adjust if your backend is on a different domain
// https://movie-booking-bxks.onrender.com
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
