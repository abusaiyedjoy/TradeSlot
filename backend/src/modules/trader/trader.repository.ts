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

    async setStripeAccountId(traderId: string, stripeAccountId: string) {
        return prisma.trader.update({
            where: { id: traderId },
            data: { stripeAccountId },
        });
    },
};