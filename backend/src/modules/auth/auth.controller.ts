import { Router } from "express";
import { authService } from "./auth.service";
import { sendSuccess } from "../../common/utils/response.util";
import { validate } from "../../common/middleware/validate";
import { registerSchema, loginSchema } from "../../common/validators/auth.schemas";

const router = Router();

/**
 * POST /api/auth/register
 * Create a new trader account (with a linked Business record).
 */
router.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password, businessName } = req.body;
    const result = await authService.register({ name, email, password, businessName });
    return sendSuccess(res, result, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/login
 * Authenticate and receive a JWT.
 */
router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});

export default router;