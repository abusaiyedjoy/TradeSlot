import axios from "axios";
import { env } from "../../config/env";
import { whatsappMessagesUrl } from "../../config/whatsapp.config";

export async function sendWhatsAppReply(to: string, body: string): Promise<void> {
  if (!env.whatsappPhoneNumberId || !env.whatsappApiToken) {
    console.warn(
      `[WhatsApp] WhatsApp credentials not configured. Mock reply to ${to}: "${body}"`
    );
    return;
  }

  try {
    const url = whatsappMessagesUrl();
    await axios.post(
      url,
      { messaging_product: "whatsapp", to, text: { body } },
      { headers: { Authorization: `Bearer ${env.whatsappApiToken}` } }
    );
  } catch (err: any) {
    console.error(
      `[WhatsApp] Failed to send WhatsApp message to ${to}:`,
      err.response?.data || err.message
    );
  }
}