import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../../common/errors/AppError";
import { traderRepository } from "../trader/trader.repository";

export const authService = {
    async register(input: { name: string; email: string; password: string; businessName: string }) {
        const existing = await traderRepository.findByEmail(input.email);
        if (existing) throw new AppError("Email already registered", 409);

        const passwordHash = await bcrypt.hash(input.password, 10);
        const trader = await traderRepository.createWithBusiness({
            name: input.name,
            email: input.email,
            passwordHash,
            businessName: input.businessName,
        });

        return { trader: sanitize(trader), token: signToken(trader.id) };
    },

    async login(email: string, password: string) {
        const trader = await traderRepository.findByEmail(email);
        if (!trader) throw new AppError("Invalid credentials", 401);

        const valid = await bcrypt.compare(password, trader.passwordHash);
        if (!valid) throw new AppError("Invalid credentials", 401);

        return { trader: sanitize(trader), token: signToken(trader.id) };
    },
};

function signToken(traderId: string) {
    return jwt.sign({ traderId }, env.jwtSecret, { expiresIn: "7d" });
}

function sanitize(trader: { passwordHash: string;[key: string]: unknown }) {
    const { passwordHash, ...rest } = trader;
    return rest;
}