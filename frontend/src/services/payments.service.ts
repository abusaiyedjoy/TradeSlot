/**
 * payments.service.ts
 * Stripe Connect onboarding and PaymentIntent creation via the backend API.
 * Payout summary is kept as mock data — analytics module is out of MVP scope.
 */
import { apiClient } from "@/lib/api-client";

export interface PayoutSummary {
  month: string;
  grossRevenueCents: number;
  platformFeeCents: number;
  netPayoutCents: number;
  bookingCount: number;
}

// Mock payout summary data — no backend analytics endpoint in MVP
const MOCK_PAYOUT_SUMMARY: PayoutSummary[] = [
  { month: "Aug 2026", grossRevenueCents: 33000, platformFeeCents: 3000, netPayoutCents: 30000, bookingCount: 6 },
  { month: "Jul 2026", grossRevenueCents: 55000, platformFeeCents: 5000, netPayoutCents: 50000, bookingCount: 10 },
  { month: "Jun 2026", grossRevenueCents: 44000, platformFeeCents: 4000, netPayoutCents: 40000, bookingCount: 8 },
  { month: "May 2026", grossRevenueCents: 27500, platformFeeCents: 2500, netPayoutCents: 25000, bookingCount: 5 },
];

export const paymentsService = {
  /**
   * POST /api/payments/connect/onboard
   * Creates (or re-uses) a Stripe Express connected account for the trader
   * and returns a one-time account onboarding URL.
   */
  async startOnboarding(): Promise<{ url: string; stripeAccountId: string }> {
    const { data } = await apiClient.post("/payments/connect/onboard");
    return data.data;
  },

  /**
   * POST /api/payments/create-intent
   * Creates a Stripe PaymentIntent for a booking.
   * Total = placeholder job price (£50) + flat booking fee (£5).
   * Platform fee captured as application_fee_amount.
   */
  async createPaymentIntent(bookingId: string): Promise<{
    clientSecret: string;
    paymentIntentId: string;
    amountCents: number;
  }> {
    const { data } = await apiClient.post("/payments/create-intent", { bookingId });
    return data.data;
  },

  /**
   * Returns monthly payout summary.
   * NOTE: No backend analytics endpoint exists in MVP scope — returns
   * static demo data. Replace when the analytics module is built.
   */
  async getPayoutSummary(): Promise<PayoutSummary[]> {
    return MOCK_PAYOUT_SUMMARY;
  },
};
