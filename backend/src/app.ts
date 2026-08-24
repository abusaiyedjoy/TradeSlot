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
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          env.corsOrigin === "*" ||
          origin === env.corsOrigin ||
          origin.endsWith(".vercel.app") ||
          origin.includes("localhost")
        ) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  // ── Request logging ───────────────────────────────────────────────────────
  app.use(requestLogger);

  // ── Stripe webhook (MUST come before express.json) ───────────────────────
  app.use(
    "/api/webhooks",
    express.raw({ type: "application/json" }),
    stripeWebhookRouter
  );

  // ── JSON body parser for all other routes ────────────────────────────────
  app.use(express.json());

  // ── API routes ───────────────────────────────────────────────────────────
  app.use("/api", routes);

  // ── Root route for Vercel / health ───────────────────────────────────────
  app.get("/", (_req, res) => {
    res.json({
      name: "TradeSlot API",
      status: "active",
      healthUrl: "/api/health",
      version: "0.1.0",
    });
  });

  // ── Global error handler ─────────────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
