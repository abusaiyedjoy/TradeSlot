import { Router } from "express";
import Stripe from "stripe";
import { stripe } from "../../config/stripe.config";
import { env } from "../../config/env";
import { paymentsRepository } from "./payments.repository";
import { bookingService } from "../booking/booking.service";

const router = Router();

/**
 * POST /api/webhooks/stripe
 *
 * Receives Stripe events via webhook. This route is mounted BEFORE
 * express.json() in app.ts, so req.body is the raw Buffer required
 * by Stripe's signature verification.
 */
router.post("/stripe", async (req, res) => {
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, env.stripeWebhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const bookingId = intent.metadata?.bookingId;
        if (bookingId) {
          await paymentsRepository.markSucceeded(intent.id);
          await bookingService.markConfirmed(bookingId);
          console.log(`[Webhook] Payment succeeded for booking ${bookingId}`);
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        await paymentsRepository.markFailed(intent.id);
        console.log(`[Webhook] Payment failed for intent ${intent.id}`);
        break;
      }
      default:
        // Ignore other events — only handle payment outcomes for MVP
        break;
    }
  } catch (err) {
    console.error("[Webhook] Handler error:", err);
    // Still return 200 to prevent Stripe from retrying on our logic errors
  }

  return res.json({ received: true });
});

export default router;