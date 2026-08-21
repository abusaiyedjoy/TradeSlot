import { z } from "zod";

/**
 * Schema for the webchat message channel endpoint.
 * Expected format in `content`:  "BOOK <traderId> <ISO datetime> <name>"
 */
export const webchatMessageSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, "sessionId is required"),
    content: z.string().min(1, "content is required"),
  }),
});
