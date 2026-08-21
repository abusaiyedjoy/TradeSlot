import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../auth/auth.middleware";
import { bookingService } from "./booking.service";
import { sendSuccess } from "../../common/utils/response.util";
import { validate } from "../../common/middleware/validate";
import { createBookingSchema } from "../../common/validators/booking.schemas";

const router = Router();

/**
 * GET /api/bookings
 * List all bookings for the authenticated trader (auth required).
 * Must be defined BEFORE GET /:id so Express doesn't treat "GET /" as "/:id".
 */
router.get("/", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    return sendSuccess(res, await bookingService.listForTrader(req.traderId!));
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/bookings
 * Direct structured booking endpoint (used by the frontend / web widget).
 * The channel-based text-command endpoint is at /api/channels/webchat/message.
 */
router.post("/", validate(createBookingSchema), async (req, res, next) => {
  try {
    const { traderId, customerName, customerPhone, customerEmail, requestedStart, durationMinutes } =
      req.body;
    const booking = await bookingService.createBooking({
      traderId,
      customerName,
      customerPhone,
      customerEmail,
      channel: "WEBCHAT",
      requestedStart: new Date(requestedStart),
      durationMinutes,
    });
    return sendSuccess(res, booking, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/bookings/:id/confirm
 * Manually confirm a pending booking (trader only).
 */
router.patch("/:id/confirm", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const booking = await bookingService.markConfirmed(req.params.id);
    return sendSuccess(res, booking);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/bookings/:id/cancel
 * Cancel a booking (trader only).
 */
router.patch("/:id/cancel", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    return sendSuccess(res, booking);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/bookings/:id
 * Get a single booking by ID (public — customers can look up their own booking).
 * Defined LAST to prevent it matching before the routes above.
 */
router.get("/:id", async (req, res, next) => {
  try {
    return sendSuccess(res, await bookingService.getBooking(req.params.id));
  } catch (err) {
    next(err);
  }
});

export default router;