import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../auth/auth.middleware";
import { traderService } from "./trader.service";
import { workAreaService } from "./work-area.service";
import { sendSuccess } from "../../common/utils/response.util";
import { validate } from "../../common/middleware/validate";
import { setWorkAreaSchema } from "../../common/validators/booking.schemas";
import { traderRepository } from "./trader.repository";

const router = Router();

/**
 * GET /api/traders/me
 * Returns the authenticated trader's profile (password hash stripped).
 */
router.get("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const trader = await traderService.getProfile(req.traderId!);
    return sendSuccess(res, trader);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/traders/stripe-status
 * Returns the trader's Stripe Connect onboarding status.
 */
router.get("/stripe-status", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const trader = await traderRepository.findById(req.traderId!);
    return sendSuccess(res, {
      stripeAccountId: trader?.stripeAccountId ?? null,
      onboardingComplete: !!trader?.stripeAccountId,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/traders/work-area
 * Set (or update) the trader's work area for a given day.
 * This is a one-off daily setting — recurring patterns are out of MVP scope.
 */
router.post("/work-area", requireAuth, validate(setWorkAreaSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { date, areaLabel } = req.body;
    const workArea = await workAreaService.setWorkArea(req.traderId!, date, areaLabel);
    return sendSuccess(res, workArea, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/traders/work-area?date=YYYY-MM-DD
 * Retrieve the trader's work area for a specific date.
 */
router.get("/work-area", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const date = String(req.query.date ?? "");
    if (!date) {
      return res.status(400).json({ message: "date query parameter is required" });
    }
    const workArea = await workAreaService.getWorkArea(req.traderId!, date);
    return sendSuccess(res, workArea);
  } catch (err) {
    next(err);
  }
});

export default router;