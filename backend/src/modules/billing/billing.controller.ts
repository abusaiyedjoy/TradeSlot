import { Router } from "express";
import { billingService } from "./billing.service";
import { sendSuccess } from "../../common/utils/response.util";

const router = Router();

router.get("/quote", (_req, res) => {
    return sendSuccess(res, { feeCents: billingService.calculateFee() });
});

export default router;