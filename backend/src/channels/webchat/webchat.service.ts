// Webchat replies are returned synchronously in the HTTP response (see
// webchat.controller.ts), so no outbound push is needed for MVP. This file
// mirrors whatsapp.service.ts's shape so swapping in websocket-based push
// later doesn't require restructuring the channel.
export async function sendWebchatReply(_sessionId: string, _message: string) {
    return;
}