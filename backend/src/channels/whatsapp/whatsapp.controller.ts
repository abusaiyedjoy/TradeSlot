import { Router } from "express";
import { env } from "../../config/env";
import { normalizeWhatsAppPayload } from "./whatsapp.normalizer";
import { sendWhatsAppReply } from "./whatsapp.service";
import { routeIncomingMessage } from "../channel-router";

const router = Router();

// Verification handshake required by WhatsApp Cloud API
router.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    if (mode === "subscribe" && token === env.whatsappVerifyToken) {
        return res.status(200).send(req.query["hub.challenge"]);
    }
    return res.sendStatus(403);
});

router.post("/webhook", async (req, res) => {
    res.sendStatus(200); // ack immediately so WhatsApp doesn't retry

    const normalized = normalizeWhatsAppPayload(req.body);
    if (!normalized) return;

    try {
        const booking = await routeIncomingMessage(normalized);
        await sendWhatsAppReply(
            normalized.sender,
            `Booking received for ${booking.scheduledStart.toLocaleString()}. We'll confirm shortly.`
        );
    } catch (err: any) {
        await sendWhatsAppReply(normalized.sender, `Sorry — ${err.message ?? "something went wrong."}`);
    }
});

export default router;