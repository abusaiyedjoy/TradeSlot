import Stripe from "stripe";
import { env } from "./env";

/**
 * Single Stripe SDK instance for the entire application.
 * Import `stripe` from here — never instantiate it in a module file.
 */
export const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2024-06-20",
  typescript: true,
});
