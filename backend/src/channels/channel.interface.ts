export interface NormalizedMessage {
  sender: string; // phone number or session id
  channel: "whatsapp" | "webchat";
  content: string;
  timestamp: string; // ISO string
}

export interface IChannelAdapter {
  /** Convert a raw channel-specific payload into the common format */
  normalize(rawPayload: unknown): NormalizedMessage;
  /** Send a reply back through this channel */
  sendReply(recipient: string, message: string): Promise<void>;
}