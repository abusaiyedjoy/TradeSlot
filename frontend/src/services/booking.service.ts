/**
 * booking.service.ts
 * CRUD operations for bookings.
 * Mock data active — swap commented API calls when backend is connected.
 */
import { apiClient } from "@/lib/api-client";
import { MOCK_BOOKINGS, MockBooking } from "@/lib/mock-data";

export interface CreateBookingPayload {
  traderId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  requestedStart: string; // ISO datetime
  durationMinutes?: number;
}

export const bookingService = {
  async listForTrader(): Promise<MockBooking[]> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_BOOKINGS;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.get("/bookings");
    // return data.data;
  },

  async getById(id: string): Promise<MockBooking> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300));
    const booking = MOCK_BOOKINGS.find((b) => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return booking;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.get(`/bookings/${id}`);
    // return data.data;
  },

  async create(payload: CreateBookingPayload): Promise<MockBooking> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 800));
    const start = new Date(payload.requestedStart);
    const end = new Date(start.getTime() + 90 * 60 * 1000); // 60 min + 30 buffer
    const newBooking: MockBooking = {
      id: `bk-${Date.now()}`,
      traderId: payload.traderId,
      customer: {
        id: `cust-${Date.now()}`,
        name: payload.customerName,
        phone: payload.customerPhone,
        email: payload.customerEmail,
      },
      channel: "WEBCHAT",
      status: "CONFIRMED",
      scheduledStart: start.toISOString(),
      scheduledEnd: end.toISOString(),
      flatFeeCents: 500,
      createdAt: new Date().toISOString(),
    };
    return newBooking;
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/bookings", payload);
    // return data.data;
  },

  async confirm(id: string): Promise<MockBooking> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 400));
    const booking = MOCK_BOOKINGS.find((b) => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return { ...booking, status: "CONFIRMED" };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.patch(`/bookings/${id}/confirm`);
    // return data.data;
  },

  async cancel(id: string): Promise<MockBooking> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 400));
    const booking = MOCK_BOOKINGS.find((b) => b.id === id);
    if (!booking) throw new Error("Booking not found");
    return { ...booking, status: "CANCELLED" };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.patch(`/bookings/${id}/cancel`);
    // return data.data;
  },
};
