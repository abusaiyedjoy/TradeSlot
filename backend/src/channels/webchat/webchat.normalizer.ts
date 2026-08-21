import { NormalizedMessage } from "../channel.interface";

export function normalizeWebchatPayload(rawPayload: { sessionId: string; content: string }): NormalizedMessage {
    return {
        sender: rawPayload.sessionId,
        channel: "webchat",
        content: rawPayload.content,
        timestamp: new Date().toISOString(),
    };
}