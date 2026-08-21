import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    traderId: z.string().uuid("traderId must be a valid UUID"),
    customerName: z.string().min(1, "Customer name is required").max(150),
    customerPhone: z.string().optional(),
    customerEmail: z.string().email("Must be a valid email").optional(),
    requestedStart: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), "requestedStart must be a valid ISO datetime"),
    durationMinutes: z.number().int().positive().optional(),
  }),
});

export const setWorkAreaSchema = z.object({
  body: z.object({
    date: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), "date must be a valid date string (YYYY-MM-DD)"),
    areaLabel: z.string().min(1, "areaLabel is required").max(200),
  }),
});
