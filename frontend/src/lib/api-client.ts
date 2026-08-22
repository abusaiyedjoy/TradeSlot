import axios from "axios";
import { API_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor — attach JWT token if present ────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("tradeslot_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — normalize errors ────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      // Token expired or invalid — clear storage and redirect to login
      localStorage.removeItem("tradeslot_token");
      localStorage.removeItem("tradeslot_trader");
      window.location.href = "/login";
    }
    const message =
      error?.response?.data?.message ?? error.message ?? "Unknown API error";
    return Promise.reject(new Error(message));
  }
);