import { NormalizedMessage } from "../channel.interface";

// Shape based on the WhatsApp Cloud API webhook payload
export function normalizeWhatsAppPayload(rawPayload: any): NormalizedMessage | null {
    const message = rawPayload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return null; // e.g. delivery/status webhooks, not user messages

    return {
        sender: message.from,
        channel: "whatsapp",
        content: message.text?.body ?? "",
        timestamp: new Date(Number(message.timestamp) * 1000).toISOString(),
    };
}