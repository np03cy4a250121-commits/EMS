import axios from "axios";

const API = axios.create({
  baseURL: "https://ems-1-ceu5.onrender.com/api"
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;