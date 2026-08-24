/**
 * prisma/seed.ts
 * Populates the database with TradeSlot MVP demo data.
 *
 * Seeded trader credentials:
 *   Email:    alex@carter-plumbing.co.uk
 *   Password: Password123!
 *
 * Usage:  npm run seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding TradeSlot database...");

  // ── 1. Clean up existing demo data ─────────────────────────────────────────
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.workArea.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.trader.deleteMany();
  await prisma.business.deleteMany();

  console.log("🧹 Cleaned existing seed data");

  // ── 2. Business ────────────────────────────────────────────────────────────
  const business = await prisma.business.create({
    data: { name: "Carter Plumbing & Heating Ltd" },
  });

  // ── 3. Trader ──────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const trader = await prisma.trader.create({
    data: {
      businessId: business.id,
      name: "Alex Carter",
      email: "alex@carter-plumbing.co.uk",
      passwordHash,
    },
  });

  console.log(`✅ Trader created: ${trader.email}`);

  // ── 4. Work Areas ──────────────────────────────────────────────────────────
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  await prisma.workArea.createMany({
    data: [
      { traderId: trader.id, date: today,    areaLabel: "Central London (Westminster / Soho / City)" },
      { traderId: trader.id, date: tomorrow,  areaLabel: "North London (Camden / Islington / Highbury)" },
      { traderId: trader.id, date: dayAfter,  areaLabel: "East London (Hackney / Bethnal Green / Stratford)" },
    ],
  });

  console.log("✅ Work areas created (3 days)");

  // ── 5. Customers ──────────────────────────────────────────────────────────
  const customers = await Promise.all([
    prisma.customer.create({ data: { name: "Sarah Jenkins",   phone: "+447911100101", email: "sarah@email.com" } }),
    prisma.customer.create({ data: { name: "David Miller",    phone: "+447911100202" } }),
    prisma.customer.create({ data: { name: "Priya Sharma",    phone: "+447911100303", email: "priya@email.com" } }),
    prisma.customer.create({ data: { name: "James O'Brien",   email: "james@email.com" } }),
    prisma.customer.create({ data: { name: "Linda Greenwood", phone: "+447911100505" } }),
    prisma.customer.create({ data: { name: "Tom Walker",      phone: "+447911100606", email: "tom@email.com" } }),
  ]);

  console.log(`✅ ${customers.length} customers created`);

  // Helper: build a date relative to today at a specific UTC hour
  const atHour = (daysOffset: number, hour: number, minute = 0) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    d.setUTCHours(hour, minute, 0, 0);
    return d;
  };

  const FLAT_FEE_CENTS = 500;

  // ── 6. Bookings ────────────────────────────────────────────────────────────
  const [bk1, , , bk4] = await Promise.all([
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[0].id, channel: "WEBCHAT",
      status: "CONFIRMED", scheduledStart: atHour(0, 9), scheduledEnd: atHour(0, 10, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[1].id, channel: "WHATSAPP",
      status: "CONFIRMED", scheduledStart: atHour(0, 14), scheduledEnd: atHour(0, 15, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[2].id, channel: "WEBCHAT",
      status: "PENDING", scheduledStart: atHour(1, 10), scheduledEnd: atHour(1, 11, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[3].id, channel: "WHATSAPP",
      status: "COMPLETED", scheduledStart: atHour(-4, 9), scheduledEnd: atHour(-4, 10, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[4].id, channel: "WEBCHAT",
      status: "CANCELLED", scheduledStart: atHour(-5, 13), scheduledEnd: atHour(-5, 14, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
    prisma.booking.create({ data: {
      traderId: trader.id, customerId: customers[5].id, channel: "WHATSAPP",
      status: "CONFIRMED", scheduledStart: atHour(2, 11), scheduledEnd: atHour(2, 12, 30), flatFeeCents: FLAT_FEE_CENTS,
    }}),
  ]);

  console.log("✅ 6 bookings created");

  // ── 7. Payments ────────────────────────────────────────────────────────────
  await prisma.payment.createMany({
    data: [
      { bookingId: bk1.id, stripePaymentIntentId: "pi_seed_bk1_succeeded", amountCents: 5500, applicationFeeCents: FLAT_FEE_CENTS, status: "succeeded" },
      { bookingId: bk4.id, stripePaymentIntentId: "pi_seed_bk4_succeeded", amountCents: 5500, applicationFeeCents: FLAT_FEE_CENTS, status: "succeeded" },
    ],
  });

  console.log("✅ 2 payment records created");

  console.log("\n🎉 Seed complete!");
  console.log("   Login: alex@carter-plumbing.co.uk / Password123!");
  console.log("   Bookings: 6 (3 CONFIRMED, 1 PENDING, 1 COMPLETED, 1 CANCELLED)");
  console.log("   Work Areas: 3 (today + next 2 days)");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
