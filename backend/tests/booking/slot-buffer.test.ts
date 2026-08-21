import { computeSlotWindow } from "../../src/modules/booking/slot-buffer.util";
import { isOverlapping } from "../../src/common/utils/date.util";
import { DEFAULT_BUFFER_MINUTES } from "../../src/config/billing.config";

describe("Slot Buffer & Booking Window Calculation", () => {
  it("should compute scheduled window including the fixed travel buffer", () => {
    const start = new Date("2026-08-24T10:00:00.000Z");
    const durationMinutes = 60;

    const { scheduledStart, scheduledEnd } = computeSlotWindow(start, durationMinutes);

    expect(scheduledStart.toISOString()).toBe("2026-08-24T10:00:00.000Z");
    // 60 min job + 30 min buffer = 90 min total window
    const expectedEnd = new Date(start.getTime() + (durationMinutes + DEFAULT_BUFFER_MINUTES) * 60_000);
    expect(scheduledEnd.toISOString()).toBe(expectedEnd.toISOString());
  });

  it("should detect overlapping booking windows with buffer included", () => {
    const startA = new Date("2026-08-24T10:00:00.000Z");
    const endA = new Date("2026-08-24T11:30:00.000Z"); // includes 30min buffer (10:00 to 11:30)

    // Slot B requested at 11:00 (during buffer of Slot A) -> Should overlap!
    const startB = new Date("2026-08-24T11:00:00.000Z");
    const endB = new Date("2026-08-24T12:30:00.000Z");
    expect(isOverlapping(startA, endA, startB, endB)).toBe(true);

    // Slot C requested at 11:30 (exactly after buffer ends) -> Should not overlap
    const startC = new Date("2026-08-24T11:30:00.000Z");
    const endC = new Date("2026-08-24T13:00:00.000Z");
    expect(isOverlapping(startA, endA, startC, endC)).toBe(false);
  });
});
