import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../auth/auth.middleware";
import { stripeConnectService } from "./stripe-connect.service";
import { sendSuccess } from "../../common/utils/response.util";
import { prisma } from "../../db/prisma-client";

const router = Router();

router.post("/connect/onboard", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        return sendSuccess(res, await stripeConnectService.createConnectedAccountAndOnboardingLink(req.traderId!));
    } catch (err) {
        next(err);
    }
});

router.post("/create-intent", async (req, res, next) => {
    try {
        return sendSuccess(res, await stripeConnectService.createPaymentIntentForBooking(req.body.bookingId));
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/payments/summary
 * Returns monthly aggregated payout breakdown from real database records.
 */
router.get("/summary", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                booking: { traderId: req.traderId! },
                status: "succeeded",
            },
            include: { booking: true },
            orderBy: { createdAt: "desc" },
        });

        // Group payments by Month Year (e.g. "Aug 2026")
        const monthMap = new Map<string, {
            month: string;
            grossRevenueCents: number;
            platformFeeCents: number;
            netPayoutCents: number;
            bookingCount: number;
        }>();

        for (const p of payments) {
            const date = new Date(p.createdAt);
            const monthKey = date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
            const existing = monthMap.get(monthKey) || {
                month: monthKey,
                grossRevenueCents: 0,
                platformFeeCents: 0,
                netPayoutCents: 0,
                bookingCount: 0,
            };

            existing.grossRevenueCents += p.amountCents;
            existing.platformFeeCents += p.applicationFeeCents;
            existing.netPayoutCents += (p.amountCents - p.applicationFeeCents);
            existing.bookingCount += 1;

            monthMap.set(monthKey, existing);
        }

        const summary = Array.from(monthMap.values());
        return sendSuccess(res, summary);
    } catch (err) {
        next(err);
    }
});

export default router;