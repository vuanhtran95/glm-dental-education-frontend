import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
  },
});

api.defaults.timeout = 40000;

// Add a request interceptor
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
