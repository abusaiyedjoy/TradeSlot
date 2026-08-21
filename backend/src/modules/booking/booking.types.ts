export interface CreateBookingParams {
    traderId: string;
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    channel: "WHATSAPP" | "WEBCHAT";
    requestedStart: Date;
    durationMinutes?: number;
}