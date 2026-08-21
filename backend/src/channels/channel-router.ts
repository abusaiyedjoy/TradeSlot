import { NormalizedMessage } from "./channel.interface";
import { bookingService } from "../modules/booking/booking.service";
import { AppError } from "../common/errors/AppError";

/**
 * Central booking pipeline for all inbound channels.
 *
 * Every channel (WhatsApp, webchat, and any future ones) normalises its raw
 * payload into a NormalizedMessage and passes it here. Only THIS function
 * creates bookings — never the individual channel handlers directly.
 *
 * Message format expected in `content`:
 *   BOOK <traderId> <ISO-datetime> <customer name>
 *
 * Example:
 *   BOOK 550e8400-e29b-41d4-a716 2026-08-24T10:00:00 Jane Smith
 *
 * A real conversational bot would replace only the parsing step below.
 * The booking engine (bookingService.createBooking) remains untouched.
 */
export async function routeIncomingMessage(message: NormalizedMessage) {
  const parts = message.content.trim().split(" ");
  const command = parts[0]?.toUpperCase();

  if (command !== "BOOK") {
    throw new AppError(
      'Unrecognized command. Send: BOOK <traderId> <ISO-datetime> <your name>',
      400
    );
  }

  const [, traderId, isoDateTime, ...nameParts] = parts;
  if (!traderId || !isoDateTime || nameParts.length === 0) {
    throw new AppError(
      "Missing fields. Format: BOOK <traderId> <ISO-datetime> <your name>",
      400
    );
  }

  const requestedStart = new Date(isoDateTime);
  if (isNaN(requestedStart.getTime())) {
    throw new AppError("Invalid datetime. Use ISO format, e.g. 2026-08-24T10:00:00", 400);
  }

  // Create booking (starts as PENDING)
  const booking = await bookingService.createBooking({
    traderId,
    customerName: nameParts.join(" "),
    customerPhone: message.channel === "whatsapp" ? message.sender : undefined,
    channel: message.channel === "whatsapp" ? "WHATSAPP" : "WEBCHAT",
    requestedStart,
  });

  // Auto-confirm: for channel-based bookings the slot is confirmed immediately
  // on receipt so the customer gets a definitive confirmation reply.
  await bookingService.markConfirmed(booking.id);

  // Return the updated (CONFIRMED) booking
  return { ...booking, status: "CONFIRMED" as const };
}