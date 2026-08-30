/**
 * prisma/seed.ts
 * Populates the database with TradeSlot full multi-trader demo data.
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
  console.log("🌱 Seeding TradeSlot database with multi-trader directory data...");

  // ── 1. Clean up existing demo data ─────────────────────────────────────────
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.workArea.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.trader.deleteMany();
  await prisma.business.deleteMany();

  console.log("🧹 Cleaned existing data");

  // ── 2. Common dates for work areas ─────────────────────────────────────────
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // ── 3. Seed Multiple Verified Traders ──────────────────────────────────────
  const tradersData = [
    {
      name: "Alex Carter",
      email: "alex@carter-plumbing.co.uk",
      businessName: "Carter Plumbing & Heating Ltd",
      category: "Plumber",
      hourlyRate: 65,
      rating: 4.9,
      reviewsCount: 124,
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=240&h=240",
      bio: "Gas Safe certified master plumber with 10+ years of experience in residential boiler installations, emergency leaks, and bathroom piping.",
      skills: ["Leak Repair", "Pipe Installation", "Boiler Servicing", "Bathroom Fitting"],
      workAreas: [
        { date: today, areaLabel: "Central London (Westminster / Soho / City)" },
        { date: tomorrow, areaLabel: "North London (Camden / Islington / Highbury)" },
        { date: dayAfter, areaLabel: "East London (Hackney / Bethnal Green / Stratford)" },
      ],
    },
    {
      name: "Sarah Jenkins",
      email: "sarah@jenkins-electrical.co.uk",
      businessName: "Jenkins Electrical Services Ltd",
      category: "Electrician",
      hourlyRate: 70,
      rating: 4.8,
      reviewsCount: 98,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240&h=240",
      bio: "NICEIC approved domestic electrician specializing in smart home automation, EV charger points, rewiring, and safety certifications.",
      skills: ["Full Rewiring", "Smart Home Install", "Safety Auditing", "EV Charger Install"],
      workAreas: [
        { date: today, areaLabel: "West London (Kensington / Chelsea / Fulham)" },
        { date: tomorrow, areaLabel: "Central London (Westminster / Soho / City)" },
        { date: dayAfter, areaLabel: "South London (Greenwich / Southwark / Clapham)" },
      ],
    },
    {
      name: "Marcus Thorne",
      email: "marcus@thorne-carpentry.co.uk",
      businessName: "Thorne Carpentry & Joinery",
      category: "Carpenter",
      hourlyRate: 60,
      rating: 5.0,
      reviewsCount: 86,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240&h=240",
      bio: "Bespoke carpentry and architectural joinery expert. Custom alcove shelving, fitted wardrobes, door hanging, and floor installations.",
      skills: ["Custom Cabinetry", "Door Fitting", "Hardwood Flooring", "Timber Framing"],
      workAreas: [
        { date: today, areaLabel: "South London (Greenwich / Southwark / Clapham)" },
        { date: tomorrow, areaLabel: "West London (Kensington / Chelsea / Fulham)" },
        { date: dayAfter, areaLabel: "Central London (Westminster / Soho / City)" },
      ],
    },
    {
      name: "Jordan Mitchell",
      email: "jordan@mitchell-decor.co.uk",
      businessName: "Mitchell Paint & Decor Ltd",
      category: "Painter",
      hourlyRate: 55,
      rating: 4.9,
      reviewsCount: 112,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240&h=240",
      bio: "Interior & exterior decorating professional. Clean tape lines, dustless sanding, premium wallpaper hanging, and protective coatings.",
      skills: ["Interior Decorating", "Wallpaper Hanging", "Exterior Painting", "Plaster Skimming"],
      workAreas: [
        { date: today, areaLabel: "North London (Camden / Islington / Highbury)" },
        { date: tomorrow, areaLabel: "East London (Hackney / Bethnal Green / Stratford)" },
        { date: dayAfter, areaLabel: "Central London (Westminster / Soho / City)" },
      ],
    },
    {
      name: "David Kovac",
      email: "david@kovac-locks.co.uk",
      businessName: "Kovac Security & Locksmiths",
      category: "Locksmith",
      hourlyRate: 80,
      rating: 4.9,
      reviewsCount: 74,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240&h=240",
      bio: "MLA certified master locksmith. Rapid emergency lockouts, British Standard anti-snap lock upgrades, and smart access installations.",
      skills: ["Emergency Lockout", "Cylinder Upgrades", "Smart Lock Setup", "CCTV & Security"],
      workAreas: [
        { date: today, areaLabel: "Central London (Westminster / Soho / City)" },
        { date: tomorrow, areaLabel: "West London (Kensington / Chelsea / Fulham)" },
        { date: dayAfter, areaLabel: "North London (Camden / Islington / Highbury)" },
      ],
    },
  ];

  const createdTraders = [];

  for (const item of tradersData) {
    const business = await prisma.business.create({
      data: { name: item.businessName },
    });

    const trader = await prisma.trader.create({
      data: {
        businessId: business.id,
        name: item.name,
        email: item.email,
        passwordHash,
        category: item.category,
        hourlyRate: item.hourlyRate,
        rating: item.rating,
        reviewsCount: item.reviewsCount,
        avatar: item.avatar,
        bio: item.bio,
        skills: item.skills,
        verified: true,
        stripeAccountId: item.email === "alex@carter-plumbing.co.uk" ? "acct_1P_alex_demo_test" : null,
      },
    });

    // Create work areas
    await prisma.workArea.createMany({
      data: item.workAreas.map((wa) => ({
        traderId: trader.id,
        date: wa.date,
        areaLabel: wa.areaLabel,
      })),
    });

    createdTraders.push(trader);
    console.log(`✅ Created trader & business: ${item.name} (${item.category})`);
  }

  const primaryTrader = createdTraders[0]; // Alex Carter

  // ── 4. Seed Customers ──────────────────────────────────────────────────────
  const customers = await Promise.all([
    prisma.customer.create({ data: { name: "Sarah Jenkins", phone: "+447911100101", email: "sarah@email.com" } }),
    prisma.customer.create({ data: { name: "David Miller", phone: "+447911100202" } }),
    prisma.customer.create({ data: { name: "Priya Sharma", phone: "+447911100303", email: "priya@email.com" } }),
    prisma.customer.create({ data: { name: "James O'Brien", email: "james@email.com" } }),
    prisma.customer.create({ data: { name: "Linda Greenwood", phone: "+447911100505" } }),
    prisma.customer.create({ data: { name: "Tom Walker", phone: "+447911100606", email: "tom@email.com" } }),
  ]);

  console.log(`✅ ${customers.length} customers created`);

  // Helper: build date relative to today
  const atHour = (daysOffset: number, hour: number, minute = 0) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    d.setUTCHours(hour, minute, 0, 0);
    return d;
  };

  const FLAT_FEE_CENTS = 500;

  // ── 5. Seed Bookings ───────────────────────────────────────────────────────
  const [bk1, bk2, bk3, bk4, bk5, bk6] = await Promise.all([
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[0].id,
        channel: "WEBCHAT",
        status: "CONFIRMED",
        scheduledStart: atHour(0, 9),
        scheduledEnd: atHour(0, 10, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[1].id,
        channel: "WHATSAPP",
        status: "CONFIRMED",
        scheduledStart: atHour(0, 14),
        scheduledEnd: atHour(0, 15, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[2].id,
        channel: "WEBCHAT",
        status: "PENDING",
        scheduledStart: atHour(1, 10),
        scheduledEnd: atHour(1, 11, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[3].id,
        channel: "WHATSAPP",
        status: "COMPLETED",
        scheduledStart: atHour(-4, 9),
        scheduledEnd: atHour(-4, 10, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[4].id,
        channel: "WEBCHAT",
        status: "CANCELLED",
        scheduledStart: atHour(-5, 13),
        scheduledEnd: atHour(-5, 14, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
    prisma.booking.create({
      data: {
        traderId: primaryTrader.id,
        customerId: customers[5].id,
        channel: "WHATSAPP",
        status: "CONFIRMED",
        scheduledStart: atHour(2, 11),
        scheduledEnd: atHour(2, 12, 30),
        flatFeeCents: FLAT_FEE_CENTS,
      },
    }),
  ]);

  console.log("✅ 6 sample bookings created for primary trader");

  // ── 6. Seed Payments ───────────────────────────────────────────────────────
  await prisma.payment.createMany({
    data: [
      {
        bookingId: bk1.id,
        stripePaymentIntentId: "pi_seed_bk1_succeeded",
        amountCents: 5500,
        applicationFeeCents: FLAT_FEE_CENTS,
        status: "succeeded",
      },
      {
        bookingId: bk4.id,
        stripePaymentIntentId: "pi_seed_bk4_succeeded",
        amountCents: 5500,
        applicationFeeCents: FLAT_FEE_CENTS,
        status: "succeeded",
      },
      {
        bookingId: bk2.id,
        stripePaymentIntentId: "pi_seed_bk2_succeeded",
        amountCents: 5500,
        applicationFeeCents: FLAT_FEE_CENTS,
        status: "succeeded",
      },
      {
        bookingId: bk6.id,
        stripePaymentIntentId: "pi_seed_bk6_succeeded",
        amountCents: 5500,
        applicationFeeCents: FLAT_FEE_CENTS,
        status: "succeeded",
      },
    ],
  });

  console.log("✅ 4 payment records created");

  console.log("\n🎉 Database Seed Complete!");
  console.log("   Primary Trader Login: alex@carter-plumbing.co.uk / Password123!");
  console.log("   Traders in Directory: 5 verified trade professionals");
  console.log("   Categories: Plumber, Electrician, Carpenter, Painter, Locksmith");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
