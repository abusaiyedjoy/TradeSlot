import { Router } from "express";
import { authService } from "./auth.service";
import { sendSuccess } from "../../common/utils/response.util";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password, businessName } = req.body;
        const result = await authService.register({ name, email, password, businessName });
        return sendSuccess(res, result, 201);
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return sendSuccess(res, result);
    } catch (err) {
        next(err);
    }
});

export default router;