import { routeIncomingMessage } from "../../src/channels/channel-router";
import { bookingService } from "../../src/modules/booking/booking.service";

jest.mock("../../src/modules/booking/booking.service", () => ({
  bookingService: {
    createBooking: jest.fn(),
    markConfirmed: jest.fn(),
  },
}));

describe("Channel Router Normalization & Routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should parse valid command and invoke booking pipeline with auto-confirmation", async () => {
    const mockCreatedBooking = {
      id: "booking-123",
      traderId: "550e8400-e29b-41d4-a716-446655440000",
      customerId: "cust-123",
      channel: "WEBCHAT",
      scheduledStart: new Date("2026-08-24T10:00:00.000Z"),
      scheduledEnd: new Date("2026-08-24T11:30:00.000Z"),
      flatFeeCents: 500,
      status: "PENDING",
    };

    (bookingService.createBooking as jest.Mock).mockResolvedValue(mockCreatedBooking);
    (bookingService.markConfirmed as jest.Mock).mockResolvedValue({
      ...mockCreatedBooking,
      status: "CONFIRMED",
    });

    const result = await routeIncomingMessage({
      sender: "session-abc",
      channel: "webchat",
      content: "BOOK 550e8400-e29b-41d4-a716-446655440000 2026-08-24T10:00:00.000Z John Doe",
      timestamp: new Date().toISOString(),
    });

    expect(bookingService.createBooking).toHaveBeenCalledWith({
      traderId: "550e8400-e29b-41d4-a716-446655440000",
      customerName: "John Doe",
      customerPhone: undefined,
      channel: "WEBCHAT",
      requestedStart: new Date("2026-08-24T10:00:00.000Z"),
    });
    expect(bookingService.markConfirmed).toHaveBeenCalledWith("booking-123");
    expect(result.status).toBe("CONFIRMED");
  });

  it("should reject message without BOOK command", async () => {
    await expect(
      routeIncomingMessage({
        sender: "session-abc",
        channel: "webchat",
        content: "HELLO Can I book a slot?",
        timestamp: new Date().toISOString(),
      })
    ).rejects.toThrow("Unrecognized command");
  });
});
