import { prisma } from "../../db/prisma-client";

export const traderRepository = {
    async createWithBusiness(data: {
        name: string;
        email: string;
        passwordHash: string;
        businessName: string;
    }) {
        return prisma.trader.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: data.passwordHash,
                business: { create: { name: data.businessName } },
            },
        });
    },

    async findByEmail(email: string) {
        return prisma.trader.findUnique({ where: { email } });
    },

    async findById(id: string) {
        return prisma.trader.findUnique({ where: { id } });
    },

    async listPublic() {
        return prisma.trader.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                category: true,
                hourlyRate: true,
                rating: true,
                reviewsCount: true,
                avatar: true,
                bio: true,
                skills: true,
                verified: true,
                stripeAccountId: true,
                business: { select: { id: true, name: true } },
                workAreas: { select: { date: true, areaLabel: true }, orderBy: { date: "asc" } },
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    },

    async getPublicById(id: string) {
        return prisma.trader.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                category: true,
                hourlyRate: true,
                rating: true,
                reviewsCount: true,
                avatar: true,
                bio: true,
                skills: true,
                verified: true,
                stripeAccountId: true,
                business: { select: { id: true, name: true } },
                workAreas: { select: { date: true, areaLabel: true }, orderBy: { date: "asc" } },
                createdAt: true,
            },
        });
    },

    async setStripeAccountId(traderId: string, stripeAccountId: string) {
        return prisma.trader.update({
            where: { id: traderId },
            data: { stripeAccountId },
        });
    },
};
