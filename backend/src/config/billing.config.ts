import { env } from "./env";

// Kept as a named export (not inlined everywhere) so dynamic/tiered pricing
// — future scope — can replace this without touching billing or booking logic.

// Platform's cut on every booking, captured as Stripe application_fee_amount.
export const FLAT_BOOKING_FEE_CENTS = env.platformFeeCents;

// ASSUMPTION: the brief only requires a flat *booking* fee (job pricing is
// out of scope for MVP). A fixed placeholder job price is charged alongside
// the booking fee to make the Stripe Connect flow demonstrable end-to-end.
// Replace with real job pricing when dynamic pricing is in scope.
export const PLACEHOLDER_JOB_PRICE_CENTS = env.placeholderJobPriceCents;

export const DEFAULT_JOB_DURATION_MINUTES = 60;
export const DEFAULT_BUFFER_MINUTES = 30; // fixed travel-time buffer for MVP