// lib/axios.ts
import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000", // hoặc import từ `@/lib/api`
  headers: {
    Accept: "application/json",
  },
});

// Gắn interceptor để tự động gắn token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
