/**
 * trader.service.ts
 * Trader profile, Stripe status, and work area management.
 */
import { apiClient } from "@/lib/api-client";
import { MOCK_TRADER, MOCK_WORK_AREAS, MockTrader, MockWorkArea } from "@/lib/mock-data";

export const traderService = {
  async getProfile(): Promise<MockTrader> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_TRADER;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.get("/traders/me");
    // return data.data;
  },

  async getStripeStatus(): Promise<{ stripeAccountId: string | null; onboardingComplete: boolean }> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300));
    return {
      stripeAccountId: MOCK_TRADER.stripeAccountId,
      onboardingComplete: MOCK_TRADER.onboardingComplete,
    };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.get("/traders/stripe-status");
    // return data.data;
  },

  async setWorkArea(date: string, areaLabel: string): Promise<MockWorkArea> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 500));
    return {
      id: `wa-${Date.now()}`,
      traderId: MOCK_TRADER.id,
      date,
      areaLabel,
      createdAt: new Date().toISOString(),
    };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/traders/work-area", { date, areaLabel });
    // return data.data;
  },

  async getWorkArea(date: string): Promise<MockWorkArea | null> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_WORK_AREAS.find((w) => w.date === date) ?? null;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.get(`/traders/work-area?date=${date}`);
    // return data.data;
  },

  async listWorkAreas(): Promise<MockWorkArea[]> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_WORK_AREAS;
    // ── TODO: No direct backend equivalent yet — query by date range when added ──
  },
};
