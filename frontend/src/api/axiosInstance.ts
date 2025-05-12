import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["apikey"] = import.meta.env.VITE_API_KEY;

  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
