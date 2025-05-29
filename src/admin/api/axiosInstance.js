// src/api/axiosInstance.js
import axios from "axios";
import { getSubdomain } from "../app/accounts/utils/getSubdomain";

const subdomain = getSubdomain(); // dynamic tenant subdomain
const baseURL = `http://${subdomain}.localhost:8000/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
