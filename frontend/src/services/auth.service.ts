/**
 * auth.service.ts
 * Handles trader registration and login via the TradeSlot backend API.
 */
import { apiClient } from "@/lib/api-client";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  businessName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  trader: {
    id: string;
    name: string;
    email: string;
    businessName?: string;
    stripeAccountId: string | null;
    createdAt: string;
  };
  token: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post("/auth/register", payload);
    const result: AuthResponse = data.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("tradeslot_token", result.token);
      localStorage.setItem("tradeslot_trader", JSON.stringify(result.trader));
    }
    return result;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post("/auth/login", payload);
    const result: AuthResponse = data.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("tradeslot_token", result.token);
      localStorage.setItem("tradeslot_trader", JSON.stringify(result.trader));
    }
    return result;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tradeslot_token");
      localStorage.removeItem("tradeslot_trader");
    }
  },

  getStoredTrader() {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("tradeslot_trader");
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("tradeslot_token");
  },
};
