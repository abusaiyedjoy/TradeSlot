// Flat platform fee — captured as Stripe application_fee_amount
export const FLAT_BOOKING_FEE_CENTS = 500; // $5.00

// ASSUMPTION: the brief only requires a flat *booking* fee (out of scope:
// dynamic job pricing). To make the Stripe Connect flow demonstrable end to
// end, a fixed placeholder job price is charged alongside the booking fee.
// Replace this with real job pricing when that becomes in-scope.
export const PLACEHOLDER_JOB_PRICE_CENTS = 5000; // $50.00

export const DEFAULT_JOB_DURATION_MINUTES = 60;
export const DEFAULT_BUFFER_MINUTES = 30; // fixed travel-time buffer