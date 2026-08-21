import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  port: optional("PORT", "4000"),
  nodeEnv: optional("NODE_ENV", "development"),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  stripeSecretKey: required("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: required("STRIPE_WEBHOOK_SECRET"),
  whatsappApiToken: optional("WHATSAPP_API_TOKEN", ""),
  whatsappPhoneNumberId: optional("WHATSAPP_PHONE_NUMBER_ID", ""),
  whatsappVerifyToken: optional("WHATSAPP_VERIFY_TOKEN", "tradeslot-verify"),
  corsOrigin: optional("CORS_ORIGIN", "http://localhost:3000"),
  // Flat platform fee captured as Stripe application_fee_amount (in cents).
  // Override via PLATFORM_FEE_CENTS. Default: 500 = £5.00 / $5.00.
  platformFeeCents: parseInt(optional("PLATFORM_FEE_CENTS", "500"), 10),
  // Placeholder job price for Stripe PaymentIntent total (MVP only).
  // Replace with real job pricing when dynamic pricing is in scope.
  placeholderJobPriceCents: parseInt(optional("PLACEHOLDER_JOB_PRICE_CENTS", "5000"), 10),
};