/**
 * payments.service.ts
 * Stripe Connect onboarding and PaymentIntent creation.
 */
import { apiClient } from "@/lib/api-client";
import { MOCK_PAYOUT_SUMMARY, MockPayoutSummary } from "@/lib/mock-data";

export const paymentsService = {
  async startOnboarding(): Promise<{ url: string; stripeAccountId: string }> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 700));
    return {
      url: "https://connect.stripe.com/setup/mock-onboarding-url",
      stripeAccountId: "acct_1P4Xq2Rk9mJnM8Tz",
    };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/payments/connect/onboard");
    // return data.data;
  },

  async createPaymentIntent(bookingId: string): Promise<{
    clientSecret: string;
    paymentIntentId: string;
    amountCents: number;
  }> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 600));
    return {
      clientSecret: "pi_mock_secret_tradeslot_dev",
      paymentIntentId: `pi_${Date.now()}`,
      amountCents: 5500,
    };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/payments/create-intent", { bookingId });
    // return data.data;
  },

  async getPayoutSummary(): Promise<MockPayoutSummary[]> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_PAYOUT_SUMMARY;
    // ── TODO: No backend endpoint yet — add when analytics module is built ──
  },
};
