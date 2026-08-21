import { addMinutes } from "../../common/utils/date.util";
import { DEFAULT_BUFFER_MINUTES, DEFAULT_JOB_DURATION_MINUTES } from "../../config/billing.config";

export function computeSlotWindow(requestedStart: Date, durationMinutes = DEFAULT_JOB_DURATION_MINUTES) {
    const scheduledStart = requestedStart;
    const jobEnd = addMinutes(scheduledStart, durationMinutes);
    const scheduledEnd = addMinutes(jobEnd, DEFAULT_BUFFER_MINUTES); // reserved travel buffer
    return { scheduledStart, scheduledEnd };
}