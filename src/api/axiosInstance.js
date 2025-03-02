import axios from "axios";

const productionURL =
  "https://guess-game-backend-production.up.railway.app/api";
const localURL = "http://localhost:5000/api";

const baseURL =
  process.env.NODE_ENV === "production" ? productionURL : localURL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptors (Optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request before sending it (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors (Optional)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
