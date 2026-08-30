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
   * GET /api/payments/summary
   * Returns monthly payout summary computed directly from database payment records.
   */
  async getPayoutSummary(): Promise<PayoutSummary[]> {
    try {
      const { data } = await apiClient.get("/payments/summary");
      return data.data || [];
    } catch {
      return [];
    }
  },
};
