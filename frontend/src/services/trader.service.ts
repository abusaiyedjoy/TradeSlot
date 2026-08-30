/**
 * trader.service.ts
 * Trader profile, Stripe status, and work area management via the backend API.
 */
import { apiClient } from "@/lib/api-client";

export interface TraderProfile {
  id: string;
  name: string;
  email: string;
  businessId: string;
  stripeAccountId: string | null;
  createdAt: string;
}

export interface PublicTraderRecord {
  id: string;
  name: string;
  email: string;
  category: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  skills: string[];
  verified: boolean;
  stripeAccountId: string | null;
  business?: { id: string; name: string };
  workAreas?: { date: string; areaLabel: string }[];
  createdAt?: string;
}

export interface WorkAreaRecord {
  id: string;
  traderId: string;
  date: string;
  areaLabel: string;
  createdAt: string;
}

export const traderService = {
  /** GET /api/traders/me — Authenticated trader profile */
  async getProfile(): Promise<TraderProfile> {
    const { data } = await apiClient.get("/traders/me");
    return data.data;
  },

  /** GET /api/traders/public — Public list of registered traders */
  async listPublicTraders(): Promise<PublicTraderRecord[]> {
    try {
      const { data } = await apiClient.get("/traders/public");
      return data.data || [];
    } catch {
      return [];
    }
  },

  /** GET /api/traders/:id/public — Get public trader details by ID */
  async getPublicTrader(id: string): Promise<PublicTraderRecord | null> {
    try {
      const { data } = await apiClient.get(`/traders/${id}/public`);
      return data.data ?? null;
    } catch {
      return null;
    }
  },

  /** GET /api/traders/stripe-status — Stripe Connect onboarding status */
  async getStripeStatus(): Promise<{ stripeAccountId: string | null; onboardingComplete: boolean }> {
    const { data } = await apiClient.get("/traders/stripe-status");
    return data.data;
  },

  /** POST /api/traders/work-area — Set or update the work area for a date */
  async setWorkArea(date: string, areaLabel: string): Promise<WorkAreaRecord> {
    const { data } = await apiClient.post("/traders/work-area", { date, areaLabel });
    return data.data;
  },

  /** GET /api/traders/work-area?date=YYYY-MM-DD — Get work area for a specific date */
  async getWorkArea(date: string): Promise<WorkAreaRecord | null> {
    try {
      const { data } = await apiClient.get(`/traders/work-area?date=${date}`);
      return data.data ?? null;
    } catch {
      return null;
    }
  },

  /** GET /api/traders/work-areas — List all configured work areas for the trader */
  async listWorkAreas(): Promise<WorkAreaRecord[]> {
    const { data } = await apiClient.get("/traders/work-areas");
    return data.data;
  },
};
