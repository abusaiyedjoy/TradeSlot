import { AppError } from "../../common/errors/AppError";
import { bookingRepository } from "./booking.repository";
import { computeSlotWindow } from "./slot-buffer.util";
import { billingService } from "../billing/billing.service";
import { workAreaService } from "../trader/work-area.service";
import { CreateBookingParams } from "./booking.types";

export const bookingService = {
  /**
   * Single shared entry point for WhatsApp, webchat, and any future channel.
   * All channels produce a CreateBookingParams and call this method —
   * the booking engine itself has no knowledge of which channel triggered it.
   */
  async createBooking(params: CreateBookingParams) {
    const { traderId, requestedStart, durationMinutes, channel } = params;

    // 1. Verify trader has set a work area for the requested date
    const dateKey = requestedStart.toISOString().slice(0, 10);
    const workArea = await workAreaService.getWorkArea(traderId, dateKey);
    if (!workArea) {
      throw new AppError(
        `Trader has no work area set for ${dateKey}. The trader must set their work area first.`,
        422
      );
    }

    // 2. Compute scheduled window (job duration + fixed travel buffer)
    const { scheduledStart, scheduledEnd } = computeSlotWindow(requestedStart, durationMinutes);

    // 3. Check for slot conflicts (including buffer time)
    const overlap = await bookingRepository.hasOverlap(traderId, scheduledStart, scheduledEnd);
    if (overlap) {
      throw new AppError(
        "Requested slot is not available — it conflicts with an existing booking (including travel buffer).",
        409
      );
    }

    // 4. Find or create customer (deduplication by phone/email)
    const customer = await bookingRepository.upsertCustomer({
      name: params.customerName,
      phone: params.customerPhone,
      email: params.customerEmail,
    });

    // 5. Compute flat booking fee
    const flatFeeCents = billingService.calculateFee({ traderId, scheduledStart });

    // 6. Persist booking
    return bookingRepository.create({
      traderId,
      customerId: customer.id,
      channel,
      scheduledStart,
      scheduledEnd,
      flatFeeCents,
    });
  },

  async getBooking(id: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError("Booking not found", 404);
    return booking;
  },

  async listForTrader(traderId: string) {
    return bookingRepository.listByTrader(traderId);
  },

  async markConfirmed(id: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError("Booking not found", 404);
    if (booking.status === "CANCELLED") {
      throw new AppError("Cannot confirm a cancelled booking", 409);
    }
    return bookingRepository.updateStatus(id, "CONFIRMED");
  },

  async cancelBooking(id: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError("Booking not found", 404);
    if (booking.status === "COMPLETED") {
      throw new AppError("Cannot cancel a completed booking", 409);
    }
    if (booking.status === "CANCELLED") {
      throw new AppError("Booking is already cancelled", 409);
    }
    return bookingRepository.updateStatus(id, "CANCELLED");
  },
};