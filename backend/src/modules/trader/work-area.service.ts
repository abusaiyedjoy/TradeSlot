import { prisma } from "../../db/prisma-client";
import { AppError } from "../../common/errors/AppError";
import { startOfDay, endOfDay } from "../../common/utils/date.util";

export const workAreaService = {
    // One-off daily setting for MVP — not a recurring weekly pattern
    async setWorkArea(traderId: string, date: string, areaLabel: string) {
        if (!areaLabel?.trim()) {
            throw new AppError("areaLabel is required", 400);
        }

        const start = startOfDay(new Date(date));
        const end = endOfDay(new Date(date));
        const existing = await prisma.workArea.findFirst({
            where: {
                traderId,
                date: { gte: start, lte: end },
            },
        });

        if (existing) {
            return prisma.workArea.update({
                where: { id: existing.id },
                data: { areaLabel, date: start },
            });
        }

        return prisma.workArea.create({ data: { traderId, date: start, areaLabel } });
    },

    async getWorkArea(traderId: string, date: string) {
        const start = startOfDay(new Date(date));
        const end = endOfDay(new Date(date));
        return prisma.workArea.findFirst({
            where: {
                traderId,
                date: { gte: start, lte: end },
            },
        });
    },

    /**
     * List all work areas for a trader, ordered by date ascending.
     * Used by the frontend dashboard + work-area management page.
     */
    async listWorkAreas(traderId: string) {
        return prisma.workArea.findMany({
            where: { traderId },
            orderBy: { date: "asc" },
        });
    },
};