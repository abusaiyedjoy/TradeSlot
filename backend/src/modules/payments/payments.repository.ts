import { prisma } from "../../db/prisma-client";

export const paymentsRepository = {
    async createPending(data: {
        bookingId: string;
        stripePaymentIntentId: string;
        amountCents: number;
        applicationFeeCents: number;
    }) {
        return prisma.payment.create({ data: { ...data, status: "pending" } });
    },

    async markSucceeded(stripePaymentIntentId: string) {
        return prisma.payment.update({ where: { stripePaymentIntentId }, data: { status: "succeeded" } });
    },

    async markFailed(stripePaymentIntentId: string) {
        return prisma.payment.update({ where: { stripePaymentIntentId }, data: { status: "failed" } });
    },
};