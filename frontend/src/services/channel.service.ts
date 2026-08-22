/**
 * channel.service.ts
 * Sends messages through the webchat booking channel.
 */
import { apiClient } from "@/lib/api-client";

export interface WebchatMessagePayload {
  sessionId: string;
  content: string; // "BOOK <traderId> <ISO datetime> <customer name>"
}

export interface WebchatMessageResponse {
  data: {
    id: string;
    status: string;
    scheduledStart: string;
    scheduledEnd: string;
  };
  reply: string;
}

export const channelService = {
  async sendWebchatMessage(payload: WebchatMessagePayload): Promise<WebchatMessageResponse> {
    // ── MOCK ──────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 600));
    return {
      data: {
        id: `bk-${Date.now()}`,
        status: "CONFIRMED",
        scheduledStart: new Date().toISOString(),
        scheduledEnd: new Date(Date.now() + 90 * 60000).toISOString(),
      },
      reply: "Booking confirmed! Your slot has been secured.",
    };
    // ── TODO: Uncomment when connecting to backend ────────────────────────
    // const { data } = await apiClient.post("/channels/webchat/message", payload);
    // return data;
  },
};
