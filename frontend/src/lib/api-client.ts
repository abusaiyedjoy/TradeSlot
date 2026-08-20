import axios from "axios";
import { API_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error normalization — extend as auth/session is added
    const message =
      error?.response?.data?.message ?? error.message ?? "Unknown API error";
    return Promise.reject(new Error(message));
  }
);