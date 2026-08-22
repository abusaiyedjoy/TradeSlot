// ─── TradeSlot Mock Data ────────────────────────────────────────────────────
// Mirrors the backend Prisma schema. All IDs are stable UUIDs so they can be
// used as query params across pages without breaking navigation.

// ── Types ────────────────────────────────────────────────────────────────────

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type BookingChannel = "WHATSAPP" | "WEBCHAT";

export interface MockTrader {
  id: string;
  name: string;
  email: string;
  businessName: string;
  stripeAccountId: string | null;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface MockCustomer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface MockBooking {
  id: string;
  traderId: string;
  customer: MockCustomer;
  channel: BookingChannel;
  status: BookingStatus;
  scheduledStart: string;
  scheduledEnd: string;
  flatFeeCents: number;
  createdAt: string;
  payment?: MockPaymentRecord;
}

export interface MockPaymentRecord {
  id: string;
  bookingId: string;
  stripePaymentIntentId: string;
  amountCents: number;
  applicationFeeCents: number;
  status: "PENDING" | "SUCCEEDED" | "FAILED";
  createdAt: string;
}

export interface MockWorkArea {
  id: string;
  traderId: string;
  date: string;
  areaLabel: string;
  createdAt: string;
}

export interface MockPayoutSummary {
  month: string;
  grossRevenueCents: number;
  platformFeeCents: number;
  netPayoutCents: number;
  bookingCount: number;
}

// ── Mock Trader (logged-in trader profile) ────────────────────────────────────
export const MOCK_TRADER: MockTrader = {
  id: "c7a829fb-b283-4a6a-8b8d-d34e56789abc",
  name: "Alex Carter",
  email: "alex@carter-plumbing.co.uk",
  businessName: "Carter Plumbing & Heating Ltd",
  stripeAccountId: "acct_1P4Xq2Rk9mJnM8Tz",
  onboardingComplete: true,
  createdAt: "2026-01-15T09:00:00.000Z",
};

// ── Mock Bookings ─────────────────────────────────────────────────────────────
export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: "bk-001",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-1", name: "Sarah Jenkins", phone: "+447911100101", email: "sarah@email.com" },
    channel: "WEBCHAT",
    status: "CONFIRMED",
    scheduledStart: "2026-08-24T09:00:00.000Z",
    scheduledEnd: "2026-08-24T10:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-22T08:12:00.000Z",
    payment: {
      id: "pay-001",
      bookingId: "bk-001",
      stripePaymentIntentId: "pi_3P4Xq2Rk9mJnM8Tz001",
      amountCents: 5500,
      applicationFeeCents: 500,
      status: "SUCCEEDED",
      createdAt: "2026-08-22T08:14:00.000Z",
    },
  },
  {
    id: "bk-002",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-2", name: "David Miller", phone: "+447911100202" },
    channel: "WHATSAPP",
    status: "CONFIRMED",
    scheduledStart: "2026-08-24T14:00:00.000Z",
    scheduledEnd: "2026-08-24T15:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-22T10:35:00.000Z",
    payment: {
      id: "pay-002",
      bookingId: "bk-002",
      stripePaymentIntentId: "pi_3P4Xq2Rk9mJnM8Tz002",
      amountCents: 5500,
      applicationFeeCents: 500,
      status: "SUCCEEDED",
      createdAt: "2026-08-22T10:38:00.000Z",
    },
  },
  {
    id: "bk-003",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-3", name: "Priya Sharma", phone: "+447911100303", email: "priya@email.com" },
    channel: "WEBCHAT",
    status: "PENDING",
    scheduledStart: "2026-08-25T10:00:00.000Z",
    scheduledEnd: "2026-08-25T11:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-22T14:00:00.000Z",
  },
  {
    id: "bk-004",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-4", name: "James O'Brien", email: "james@email.com" },
    channel: "WHATSAPP",
    status: "COMPLETED",
    scheduledStart: "2026-08-20T09:00:00.000Z",
    scheduledEnd: "2026-08-20T10:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-18T11:00:00.000Z",
    payment: {
      id: "pay-004",
      bookingId: "bk-004",
      stripePaymentIntentId: "pi_3P4Xq2Rk9mJnM8Tz004",
      amountCents: 5500,
      applicationFeeCents: 500,
      status: "SUCCEEDED",
      createdAt: "2026-08-18T11:05:00.000Z",
    },
  },
  {
    id: "bk-005",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-5", name: "Linda Greenwood", phone: "+447911100505" },
    channel: "WEBCHAT",
    status: "CANCELLED",
    scheduledStart: "2026-08-19T13:00:00.000Z",
    scheduledEnd: "2026-08-19T14:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-17T09:00:00.000Z",
  },
  {
    id: "bk-006",
    traderId: MOCK_TRADER.id,
    customer: { id: "cust-6", name: "Tom Walker", phone: "+447911100606", email: "tom@email.com" },
    channel: "WHATSAPP",
    status: "CONFIRMED",
    scheduledStart: "2026-08-26T11:00:00.000Z",
    scheduledEnd: "2026-08-26T12:30:00.000Z",
    flatFeeCents: 500,
    createdAt: "2026-08-22T16:00:00.000Z",
  },
];

// ── Mock Work Areas ────────────────────────────────────────────────────────────
export const MOCK_WORK_AREAS: MockWorkArea[] = [
  {
    id: "wa-001",
    traderId: MOCK_TRADER.id,
    date: "2026-08-24",
    areaLabel: "Central London (Westminster / Soho)",
    createdAt: "2026-08-22T07:30:00.000Z",
  },
  {
    id: "wa-002",
    traderId: MOCK_TRADER.id,
    date: "2026-08-25",
    areaLabel: "North London (Camden / Islington)",
    createdAt: "2026-08-22T07:32:00.000Z",
  },
  {
    id: "wa-003",
    traderId: MOCK_TRADER.id,
    date: "2026-08-26",
    areaLabel: "East London (Hackney / Bethnal Green)",
    createdAt: "2026-08-22T07:34:00.000Z",
  },
];

// ── Mock Payout Summary ────────────────────────────────────────────────────────
export const MOCK_PAYOUT_SUMMARY: MockPayoutSummary[] = [
  { month: "Aug 2026", grossRevenueCents: 33000, platformFeeCents: 3000, netPayoutCents: 30000, bookingCount: 6 },
  { month: "Jul 2026", grossRevenueCents: 55000, platformFeeCents: 5000, netPayoutCents: 50000, bookingCount: 10 },
  { month: "Jun 2026", grossRevenueCents: 44000, platformFeeCents: 4000, netPayoutCents: 40000, bookingCount: 8 },
  { month: "May 2026", grossRevenueCents: 27500, platformFeeCents: 2500, netPayoutCents: 25000, bookingCount: 5 },
];

// ── Dashboard Stats (derived from bookings) ───────────────────────────────────
export const MOCK_DASHBOARD_STATS = {
  totalBookings: 6,
  confirmedBookings: 3,
  pendingBookings: 1,
  cancelledBookings: 1,
  completedBookings: 1,
  totalRevenueCents: 33000,
  platformFeesTotalCents: 3000,
  netRevenueCents: 30000,
};
