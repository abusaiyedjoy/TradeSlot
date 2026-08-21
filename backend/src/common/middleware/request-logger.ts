import morgan from "morgan";
import { env } from "../../config/env";

/**
 * HTTP request logger middleware.
 * - Development: coloured `dev` format (method, path, status, latency).
 * - Production:  compact JSON line with timestamp so it's grep/pipe-friendly.
 */
export const requestLogger =
  env.nodeEnv === "production"
    ? morgan(
        (tokens, req, res) =>
          JSON.stringify({
            ts: tokens.date(req, res, "iso"),
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: tokens.status(req, res),
            ms: tokens["response-time"](req, res),
          })
      )
    : morgan("dev");
