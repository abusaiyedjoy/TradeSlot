import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../auth/auth.middleware";
import { stripeConnectService } from "./stripe-connect.service";
import { sendSuccess } from "../../common/utils/response.util";

const router = Router();

router.post("/connect/onboard", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        return sendSuccess(res, await stripeConnectService.createConnectedAccountAndOnboardingLink(req.traderId!));
    } catch (err) {
        next(err);
    }
});

router.post("/create-intent", async (req, res, next) => {
    try {
        return sendSuccess(res, await stripeConnectService.createPaymentIntentForBooking(req.body.bookingId));
    } catch (err) {
        next(err);
    }
});

export default router;