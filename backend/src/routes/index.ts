import { Router } from "express";
import authRouter from "../modules/auth/auth.controller";
import traderRouter from "../modules/trader/trader.controller";
import bookingRouter from "../modules/booking/booking.controller";
import billingRouter from "../modules/billing/billing.controller";
import paymentsRouter from "../modules/payments/stripe-connect.controller";
import whatsappRouter from "../channels/whatsapp/whatsapp.controller";
import webchatRouter from "../channels/webchat/webchat.controller";

const router = Router();

// Health check
router.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));

// Auth (register / login)
router.use("/auth", authRouter);

// Trader profile and work-area management
router.use("/traders", traderRouter);

// Booking management (create, list, confirm, cancel)
router.use("/bookings", bookingRouter);

// Billing quote
router.use("/billing", billingRouter);

// Stripe Connect (onboarding, payment intents)
router.use("/payments", paymentsRouter);

// Inbound booking channels
router.use("/channels/whatsapp", whatsappRouter);
router.use("/channels/webchat", webchatRouter);

export default router;