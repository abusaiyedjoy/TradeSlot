import { prisma } from "../../db/prisma-client";
import { isOverlapping, startOfDay, endOfDay } from "../../common/utils/date.util";

export const bookingRepository = {
  // ── Customer helpers ─────────────────────────────────────────────────────

  /**
   * Find an existing customer by phone or email so we don't create
   * duplicate customer rows for repeat bookings.
   */
  async findCustomerByPhoneOrEmail(phone?: string, email?: string) {
    const conditions: Array<{ phone?: string; email?: string }> = [];
    if (phone && phone.trim()) conditions.push({ phone: phone.trim() });
    if (email && email.trim()) conditions.push({ email: email.trim() });
    if (conditions.length === 0) return null;

    return prisma.customer.findFirst({
      where: { OR: conditions },
    });
  },

  /**
   * Returns an existing customer (matched by phone or email) or creates a
   * new one. Keeps customer records clean across channels.
   */
  async upsertCustomer(data: { name: string; phone?: string; email?: string }) {
    const phone = data.phone?.trim() || null;
    const email = data.email?.trim() || null;
    const existing = await this.findCustomerByPhoneOrEmail(phone ?? undefined, email ?? undefined);
    if (existing) return existing;
    return prisma.customer.create({
      data: {
        name: data.name.trim(),
        phone,
        email,
      },
    });
  },

  // ── Booking helpers ──────────────────────────────────────────────────────

  async findTraderBookingsBetween(traderId: string, dayStart: Date, dayEnd: Date) {
    return prisma.booking.findMany({
      where: {
        traderId,
        status: { in: ["PENDING", "CONFIRMED"] },
        scheduledStart: { gte: dayStart, lt: dayEnd },
      },
    });
  },

  async hasOverlap(traderId: string, start: Date, end: Date) {
    const sameDayBookings = await this.findTraderBookingsBetween(
      traderId,
      startOfDay(start),
      endOfDay(start)
    );
    return sameDayBookings.some((b) => isOverlapping(start, end, b.scheduledStart, b.scheduledEnd));
  },

  async create(data: {
    traderId: string;
    customerId: string;
    channel: "WHATSAPP" | "WEBCHAT";
    scheduledStart: Date;
    scheduledEnd: Date;
    flatFeeCents: number;
  }) {
    return prisma.booking.create({
      data,
      include: {
        customer: true,
        payment: true,
        trader: {
          select: {
            id: true,
            name: true,
            email: true,
            category: true,
            hourlyRate: true,
            rating: true,
            reviewsCount: true,
            avatar: true,
          },
        },
      },
    });
  },

  async findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: { payment: true, customer: true, trader: { select: { id: true, name: true, email: true } } },
    });
  },

  async updateStatus(id: string, status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED") {
    return prisma.booking.update({ where: { id }, data: { status } });
  },

  async listByTrader(traderId: string) {
    return prisma.booking.findMany({
      where: { traderId },
      orderBy: { scheduledStart: "asc" },
      include: { customer: true, payment: true },
    });
  },
};