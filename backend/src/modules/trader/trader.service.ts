import { traderRepository } from "./trader.repository";
import { AppError } from "../../common/errors/AppError";

export const traderService = {
    async getProfile(traderId: string) {
        const trader = await traderRepository.findById(traderId);
        if (!trader) throw new AppError("Trader not found", 404);
        const { passwordHash, ...safe } = trader as any;
        return safe;
    },
};