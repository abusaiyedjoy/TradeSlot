import { prisma } from "../../db/prisma-client";
import { AppError } from "../../common/errors/AppError";
import { startOfDay } from "../../common/utils/date.util";

export const workAreaService = {
    // One-off daily setting for MVP — not a recurring weekly pattern
    async setWorkArea(traderId: string, date: string, areaLabel: string) {
        if (!areaLabel?.trim()) {
            throw new AppError("areaLabel is required", 400);
        }

        const day = startOfDay(new Date(date));
        const existing = await prisma.workArea.findFirst({
            where: { traderId, date: day },
        });

        if (existing) {
            return prisma.workArea.update({
                where: { id: existing.id },
                data: { areaLabel },
            });
        }

        return prisma.workArea.create({ data: { traderId, date: day, areaLabel } });
    },

    async getWorkArea(traderId: string, date: string) {
        const day = startOfDay(new Date(date));
        return prisma.workArea.findFirst({ where: { traderId, date: day } });
    },
};