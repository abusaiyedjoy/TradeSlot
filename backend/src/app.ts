import express from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./common/middleware/error-handler";
import { requestLogger } from "./common/middleware/request-logger";
import stripeWebhookRouter from "./modules/payments/stripe-webhook.controller";

export function createApp() {
  const app = express();

  // ── CORS ─────────────────────────────────────────────────────────────────
  app.use(cors({ origin: env.corsOrigin }));

  // ── Request logging ───────────────────────────────────────────────────────
  app.use(requestLogger);

  // ── Stripe webhook (MUST come before express.json) ───────────────────────
  // Stripe signature verification requires the RAW request body.
  // We isolate it at /api/webhooks/stripe so the remaining routes can use
  // express.json() without interference.
  app.use(
    "/api/webhooks",
    express.raw({ type: "application/json" }),
    stripeWebhookRouter
  );

  // ── JSON body parser for all other routes ────────────────────────────────
  app.use(express.json());

  // ── API routes ───────────────────────────────────────────────────────────
  app.use("/api", routes);

  // ── Global error handler ─────────────────────────────────────────────────
  app.use(errorHandler);

  return app;
}