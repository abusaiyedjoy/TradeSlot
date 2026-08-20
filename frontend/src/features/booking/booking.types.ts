export type BookingChannel = "whatsapp" | "webchat";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  traderId: string;
  customerName: string;
  channel: BookingChannel;
  scheduledStart: string; // ISO timestamp
  scheduledEnd: string; // ISO timestamp, includes buffer
  status: BookingStatus;
  flatFeeCents: number;
  createdAt: string;
}

export interface CreateBookingInput {
  traderId: string;
  customerName: string;
  channel: BookingChannel;
  requestedStart: string;
}