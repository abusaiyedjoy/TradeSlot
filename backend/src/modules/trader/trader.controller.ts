import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../auth/auth.middleware";
import { traderService } from "./trader.service";
import { workAreaService } from "./work-area.service";
import { sendSuccess } from "../../common/utils/response.util";

const router = Router();

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const trader = await traderService.getProfile(req.traderId!);
        return sendSuccess(res, trader);
    } catch (err) {
        next(err);
    }
});

router.post("/work-area", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const { date, areaLabel } = req.body;
        const workArea = await workAreaService.setWorkArea(req.traderId!, date, areaLabel);
        return sendSuccess(res, workArea, 201);
    } catch (err) {
        next(err);
    }
});

router.get("/work-area", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const workArea = await workAreaService.getWorkArea(req.traderId!, String(req.query.date));
        return sendSuccess(res, workArea);
    } catch (err) {
        next(err);
    }
});

export default router;