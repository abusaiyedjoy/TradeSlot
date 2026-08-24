/**
 * booking.service.ts
 * CRUD operations for bookings via the TradeSlot backend API.
 * Auth token is automatically attached by the apiClient request interceptor.
 */
import { apiClient } from "@/lib/api-client";

export interface CreateBookingPayload {
  traderId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  requestedStart: string; // ISO datetime
  durationMinutes?: number;
}

// Shape returned by the backend (Prisma Booking with customer + payment included)
export interface BookingRecord {
  id: string;
  traderId: string;
  customer: {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
  };
  channel: "WHATSAPP" | "WEBCHAT";
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  scheduledStart: string;
  scheduledEnd: string;
  flatFeeCents: number;
  createdAt: string;
  payment?: {
    id: string;
    bookingId: string;
    stripePaymentIntentId: string;
    amountCents: number;
    applicationFeeCents: number;
    status: string;
    createdAt: string;
  } | null;
}

export const bookingService = {
  /** GET /api/bookings — List all bookings for the authenticated trader */
  async listForTrader(): Promise<BookingRecord[]> {
    const { data } = await apiClient.get("/bookings");
    return data.data;
  },

  /** GET /api/bookings/:id — Get a single booking by ID */
  async getById(id: string): Promise<BookingRecord> {
    const { data } = await apiClient.get(`/bookings/${id}`);
    return data.data;
  },

  /** POST /api/bookings — Create a new booking (web booking flow) */
  async create(payload: CreateBookingPayload): Promise<BookingRecord> {
    const { data } = await apiClient.post("/bookings", payload);
    return data.data;
  },

  /** PATCH /api/bookings/:id/confirm — Confirm a pending booking */
  async confirm(id: string): Promise<BookingRecord> {
    const { data } = await apiClient.patch(`/bookings/${id}/confirm`);
    return data.data;
  },

  /** PATCH /api/bookings/:id/cancel — Cancel a booking */
  async cancel(id: string): Promise<BookingRecord> {
    const { data } = await apiClient.patch(`/bookings/${id}/cancel`);
    return data.data;
  },
};
