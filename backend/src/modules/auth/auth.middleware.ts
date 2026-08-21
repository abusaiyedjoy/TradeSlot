import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../../common/errors/AppError";

export interface AuthenticatedRequest extends Request {
    traderId?: string;
}

export function requireAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new AppError("Missing or invalid authorization header", 401));
    }

    try {
        const payload = jwt.verify(header.replace("Bearer ", ""), env.jwtSecret) as { traderId: string };
        req.traderId = payload.traderId;
        next();
    } catch {
        next(new AppError("Invalid or expired token", 401));
    }
}