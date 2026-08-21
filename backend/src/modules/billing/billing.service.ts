import { FLAT_BOOKING_FEE_CENTS } from "../../config/billing.config";

// Kept as a strategy-style function (not a hardcoded constant used directly
// everywhere) so dynamic/tiered pricing — future scope — can replace this
// implementation without booking logic needing to change.
export const billingService = {
    calculateFee(_context?: { traderId: string; scheduledStart: Date }): number {
        return FLAT_BOOKING_FEE_CENTS;
    },
};