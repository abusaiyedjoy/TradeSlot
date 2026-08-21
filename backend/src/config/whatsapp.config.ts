import { env } from "./env";

/** WhatsApp Cloud API base URL (Graph API v20). */
export const WHATSAPP_API_BASE = "https://graph.facebook.com/v20.0";

/**
 * Returns the endpoint to send an outbound WhatsApp message via the phone
 * number tied to this account.
 */
export function whatsappMessagesUrl(): string {
  return `${WHATSAPP_API_BASE}/${env.whatsappPhoneNumberId}/messages`;
}
