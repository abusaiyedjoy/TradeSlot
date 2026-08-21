# TradeSlot Backend API — Minimum Viable Product (MVP)

TradeSlot is a booking platform for tradespeople designed to support multi-channel intake (WhatsApp & Webchat), travel-time buffer scheduling, flat platform fee billing, and direct trader payouts via Stripe Connect.

---

## Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Environment Variables Setup Guide](#environment-variables-setup-guide)
3. [Installation & Local Setup](#installation--local-setup)
4. [Database & Prisma Migrations](#database--prisma-migrations)
5. [End-to-End Postman API Testing Guide](#end-to-end-postman-api-testing-guide)
6. [Architectural Decisions & Future Scope](#architectural-decisions--future-scope)

---

## Tech Stack & Architecture

- **Runtime & Language**: Node.js & TypeScript
- **Framework**: Express.js
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: JWT & bcryptjs password hashing
- **Payments & Payouts**: Stripe Connect (Express accounts) + Webhooks
- **Input Validation**: Zod schema validation
- **Testing**: Jest & ts-jest

### Architecture Principles
- **Normalized Inbound Pipeline**: All incoming bookings from any channel (WhatsApp, Webchat, future channels) are normalized to a common structure (`NormalizedMessage`) before being processed by a single backend booking pipeline.
- **Single Booking Engine**: Channel routing is decoupled from core scheduling logic.
- **Fixed Travel-Time Buffer**: Every booking calculates a scheduled window = `requestedStart` to `requestedStart + duration + 30 min buffer`, preventing overlapping appointments.
- **Direct Payout + Platform Fee Capture**: Stripe Connect transfers job amounts directly to the trader while capturing a flat platform application fee.

---

## Environment Variables Setup Guide

Create a `.env` file in `/backend` based on `.env.example`:

| Variable | Description | Where / How to get it |
| :--- | :--- | :--- |
| `PORT` | API Server port | Default: `4000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CORS_ORIGIN` | Allowed frontend origin | e.g. `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection URL | Local PostgreSQL (`postgresql://postgres:password@localhost:5432/tradeslot?schema=public`) or Cloud DB (Neon, Supabase, Railway, Render) |
| `JWT_SECRET` | Secret key for signing trader JWT tokens | Any random 32+ character string (e.g. `openssl rand -base64 32`) |
| `STRIPE_SECRET_KEY` | Stripe Secret API Key (Test Mode) | [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) -> Developers -> API Keys (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret to verify Stripe Webhooks | Generated via Stripe CLI: `stripe listen --forward-to localhost:4000/api/webhooks/stripe` or [Stripe Dashboard Webhooks](https://dashboard.stripe.com/test/webhooks) (`whsec_...`) |
| `WHATSAPP_API_TOKEN` | WhatsApp Cloud API Bearer Token | [Meta for Developers](https://developers.facebook.com) -> WhatsApp App -> API Setup -> Temporary/Permanent Access Token |
| `WHATSAPP_PHONE_NUMBER_ID`| WhatsApp sender Phone Number ID | Meta App Dashboard -> WhatsApp -> API Setup -> Phone number ID |
| `WHATSAPP_VERIFY_TOKEN` | Webhook verification handshake token | Any custom string you set in Meta App webhook config (e.g. `tradeslot-verify`) |
| `PLATFORM_FEE_CENTS` | Flat platform booking fee in cents | Default: `500` ($5.00 / £5.00) |
| `PLACEHOLDER_JOB_PRICE_CENTS`| Placeholder job price for MVP in cents | Default: `5000` ($50.00 / £50.00) |

---

## Installation & Local Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Setup your .env file
cp .env.example .env

# 4. Generate Prisma Client & Run DB Migrations
npx prisma generate
npx prisma migrate dev --name init

# 5. Run tests
npm test

# 6. Start development server
npm run dev
```

The API will be live at `http://localhost:4000`.

---

## End-to-End Postman API Testing Guide

### 1. Health Check
- **Endpoint**: `GET http://localhost:4000/api/health`
- **Response**: `200 OK`
  ```json
  { "status": "ok", "ts": "2026-08-21T10:00:00.000Z" }
  ```

---

### 2. Trader Registration (Auth)
- **Endpoint**: `POST http://localhost:4000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "Alex Plumber",
    "email": "alex@tradeexample.com",
    "password": "Password123!",
    "businessName": "Alex Quick Plumbing Ltd"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "trader": {
        "id": "c7a829fb-b283-4a6a-8b8d-d34e56789abc",
        "businessId": "b1b2b3b4-...",
        "name": "Alex Plumber",
        "email": "alex@tradeexample.com",
        "stripeAccountId": null,
        "createdAt": "2026-08-21T..."
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
> 💡 *Save the returned `token` as `{{token}}` in your Postman environment or Bearer Auth header.*

---

### 3. Trader Login
- **Endpoint**: `POST http://localhost:4000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "alex@tradeexample.com",
    "password": "Password123!"
  }
  ```
- **Response**: `200 OK` with trader details & fresh JWT token.

---

### 4. Trader Sets Daily Work Area
- **Endpoint**: `POST http://localhost:4000/api/traders/work-area`
- **Headers**:
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "date": "2026-08-24",
    "areaLabel": "Central London / Zone 1"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "id": "...",
      "traderId": "c7a829fb-...",
      "date": "2026-08-24T00:00:00.000Z",
      "areaLabel": "Central London / Zone 1",
      "createdAt": "2026-08-21T..."
    }
  }
  ```

---

### 5. Check Work Area for a Date
- **Endpoint**: `GET http://localhost:4000/api/traders/work-area?date=2026-08-24`
- **Headers**: `Authorization: Bearer {{token}}`
- **Response**: `200 OK`

---

### 6. Channel Intake 1: Webchat Message (Text Bot Simulation)
- **Endpoint**: `POST http://localhost:4000/api/channels/webchat/message`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "sessionId": "web-session-9876",
    "content": "BOOK c7a829fb-b283-4a6a-8b8d-d34e56789abc 2026-08-24T10:00:00.000Z Sarah Jenkins"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "id": "booking-uuid-...",
      "traderId": "c7a829fb-...",
      "customerId": "cust-uuid-...",
      "channel": "WEBCHAT",
      "scheduledStart": "2026-08-24T10:00:00.000Z",
      "scheduledEnd": "2026-08-24T11:30:00.000Z",
      "status": "CONFIRMED",
      "flatFeeCents": 500
    },
    "reply": "Booking confirmed for 8/24/2026, 10:00:00 AM!"
  }
  ```
> 💡 *Notice `scheduledEnd` is automatically set to 11:30 (60 min job + 30 min fixed travel buffer).*

---

### 7. Slot Conflict Verification (Buffer Overlap Test)
Try booking another slot on the same day during the travel buffer (e.g. 10:45 AM):
- **Endpoint**: `POST http://localhost:4000/api/channels/webchat/message`
- **Body**:
  ```json
  {
    "sessionId": "web-session-1111",
    "content": "BOOK c7a829fb-b283-4a6a-8b8d-d34e56789abc 2026-08-24T10:45:00.000Z Mark Taylor"
  }
  ```
- **Response**: `409 Conflict`
  ```json
  {
    "message": "Requested slot is not available — it conflicts with an existing booking (including travel buffer)."
  }
  ```

---

### 8. Channel Intake 2: WhatsApp Webhook Simulation
- **Handshake Verification**: `GET http://localhost:4000/api/channels/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=tradeslot-verify&hub.challenge=123456` -> Returns `123456`
- **Inbound Message Webhook**: `POST http://localhost:4000/api/channels/whatsapp/webhook`
- **Body**:
  ```json
  {
    "entry": [
      {
        "changes": [
          {
            "value": {
              "messages": [
                {
                  "from": "+447911123456",
                  "timestamp": "1724493600",
                  "text": {
                    "body": "BOOK c7a829fb-b283-4a6a-8b8d-d34e56789abc 2026-08-24T14:00:00.000Z David Miller"
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }
  ```
- **Response**: `200 OK`

---

### 9. Trader Views All Bookings
- **Endpoint**: `GET http://localhost:4000/api/bookings`
- **Headers**: `Authorization: Bearer {{token}}`
- **Response**: `200 OK` (Returns list of bookings with customer details, scheduled intervals, channel source, and status).

---

### 10. Trader Booking Management (Confirm & Cancel)
- **Confirm Booking**: `PATCH http://localhost:4000/api/bookings/{{bookingId}}/confirm` (Auth required)
- **Cancel Booking**: `PATCH http://localhost:4000/api/bookings/{{bookingId}}/cancel` (Auth required)

---

### 11. Stripe Connect: Trader Onboarding Link
- **Endpoint**: `POST http://localhost:4000/api/payments/connect/onboard`
- **Headers**: `Authorization: Bearer {{token}}`
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "url": "https://connect.stripe.com/setup/s/...",
      "stripeAccountId": "acct_1P..."
    }
  }
  ```

---

### 12. Check Trader Stripe Status
- **Endpoint**: `GET http://localhost:4000/api/traders/stripe-status`
- **Headers**: `Authorization: Bearer {{token}}`
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "stripeAccountId": "acct_1P...",
      "onboardingComplete": true
    }
  }
  ```

---

### 13. Create Stripe Payment Intent for Booking
- **Endpoint**: `POST http://localhost:4000/api/payments/create-intent`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "bookingId": "{{bookingId}}"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "clientSecret": "pi_3P..._secret_...",
      "paymentIntentId": "pi_3P...",
      "amountCents": 5500
    }
  }
  ```
> 💡 *The total charge ($55.00) captures $5.00 (`flatFeeCents`) as the platform application fee and routes $50.00 directly to the trader's connected account.*

---

### 14. Stripe Webhook (Payment Confirmation)
- **Endpoint**: `POST http://localhost:4000/api/webhooks/stripe`
- **Headers**: `Stripe-Signature: ...` (generated by Stripe CLI when forwarding)
- **Testing via Stripe CLI**:
  ```bash
  stripe listen --forward-to localhost:4000/api/webhooks/stripe
  stripe trigger payment_intent.succeeded
  ```
- When `payment_intent.succeeded` fires, the payment record is marked `succeeded` and the associated booking is automatically marked `CONFIRMED`.

---

## Architectural Decisions & Future Scope

| Future Scope Item | Current MVP Architecture & How It Prepares For It |
| :--- | :--- |
| **Multi-Trader Businesses** | The schema links `Trader` to a `Business` entity with a 1-to-many relationship. Multiple traders can belong to one business without refactoring the core models. |
| **Additional Channels** (`SMS`, `Telegram`, `Voice`, etc.) | Every channel implements a simple adapter that translates inbound events to `NormalizedMessage { sender, channel, content, timestamp }` and passes it to `routeIncomingMessage()`. Adding a channel only requires adding a normalizer without touching the booking engine. |
| **Dynamic / Tiered Pricing** | `billingService.calculateFee()` encapsulates fee calculations in a strategy function. When dynamic surge pricing or loyalty discounts are added, only this calculation strategy needs updating. |
| **Customer Deduplication** | `bookingRepository.upsertCustomer()` automatically identifies repeat customers by phone or email across different channels. |
| **Travel Buffers & Live Maps** | `slot-buffer.util.ts` isolates slot calculation. In the future, fixed buffers can be replaced with real-time routing engines (e.g. Google Distance Matrix) with zero changes to booking controllers. |
