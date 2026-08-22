/**
 * auth.service.ts
 * Handles trader registration and login.
 * Mock data is active — swap the commented API calls when backend is connected.
 */
import { apiClient } from "@/lib/api-client";
import { MOCK_TRADER } from "@/lib/mock-data";

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

const MOCK_TOKEN = "mock-jwt-token-tradeslot-dev";

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    // ── MOCK (remove when backend connected) ──────────────────────────────
    await new Promise((r) => setTimeout(r, 800));
    const fakeAuth: AuthResponse = {
      trader: { ...MOCK_TRADER, businessName: payload.businessName },
      token: MOCK_TOKEN,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("tradeslot_token", MOCK_TOKEN);
      localStorage.setItem("tradeslot_trader", JSON.stringify(fakeAuth.trader));
    }
    return fakeAuth;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/auth/register", payload);
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("tradeslot_token", data.data.token);
    //   localStorage.setItem("tradeslot_trader", JSON.stringify(data.data.trader));
    // }
    // return data.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 700));
    const fakeAuth: AuthResponse = { trader: MOCK_TRADER, token: MOCK_TOKEN };
    if (typeof window !== "undefined") {
      localStorage.setItem("tradeslot_token", MOCK_TOKEN);
      localStorage.setItem("tradeslot_trader", JSON.stringify(fakeAuth.trader));
    }
    return fakeAuth;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/auth/login", payload);
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("tradeslot_token", data.data.token);
    //   localStorage.setItem("tradeslot_trader", JSON.stringify(data.data.trader));
    // }
    // return data.data;
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
