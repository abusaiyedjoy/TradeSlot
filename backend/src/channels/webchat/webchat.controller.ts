import { Router } from "express";
import { normalizeWebchatPayload } from "./webchat.normalizer";
import { routeIncomingMessage } from "../channel-router";
import { validate } from "../../common/middleware/validate";
import { webchatMessageSchema } from "../../common/validators/webchat.schemas";

const router = Router();

/**
 * POST /api/channels/webchat/message
 * Handles message inputs coming from the webchat widget.
 * Expected format in content: "BOOK <traderId> <ISO datetime> <customer name>"
 */
router.post("/message", validate(webchatMessageSchema), async (req, res, next) => {
  try {
    const normalized = normalizeWebchatPayload(req.body);
    const booking = await routeIncomingMessage(normalized);
    return res.status(201).json({
      success: true,
      data: booking,
      reply: `Booking confirmed for ${new Date(booking.scheduledStart).toLocaleString()}!`,
    });
  } catch (err) {
    next(err);
  }
});

export default router;