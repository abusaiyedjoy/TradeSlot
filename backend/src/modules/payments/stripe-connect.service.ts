import { stripe } from "../../config/stripe.config";
import { env } from "../../config/env";
import { traderRepository } from "../trader/trader.repository";
import { bookingRepository } from "../booking/booking.repository";
import { paymentsRepository } from "./payments.repository";
import { AppError } from "../../common/errors/AppError";
import { PLACEHOLDER_JOB_PRICE_CENTS } from "../../config/billing.config";

export const stripeConnectService = {
  /**
   * Creates (or re-uses) a Stripe Express connected account for the trader
   * and returns a one-time account onboarding URL.
   */
  async createConnectedAccountAndOnboardingLink(traderId: string) {
    const trader = await traderRepository.findById(traderId);
    if (!trader) throw new AppError("Trader not found", 404);

    let stripeAccountId = trader.stripeAccountId;
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: trader.email,
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
      });
      stripeAccountId = account.id;
      await traderRepository.setStripeAccountId(traderId, stripeAccountId);
    }

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${env.corsOrigin}/payouts?status=refresh`,
      return_url: `${env.corsOrigin}/payouts?status=complete`,
      type: "account_onboarding",
    });

    return { url: accountLink.url, stripeAccountId };
  },

  /**
   * Creates a Stripe PaymentIntent for a booking.
   *
   * Total charge = placeholder job price + flat booking fee.
   * The booking fee is captured as application_fee_amount — it stays with
   * the platform. The remainder transfers to the trader's connected account.
   */
  async createPaymentIntentForBooking(bookingId: string) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new AppError("Booking not found", 404);

    const trader = await traderRepository.findById(booking.traderId);
    if (!trader?.stripeAccountId) {
      throw new AppError(
        "Trader has not completed Stripe onboarding. Please complete onboarding first.",
        422
      );
    }

    const totalAmount = PLACEHOLDER_JOB_PRICE_CENTS + booking.flatFeeCents;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "gbp",
      application_fee_amount: booking.flatFeeCents,
      transfer_data: { destination: trader.stripeAccountId },
      metadata: { bookingId: booking.id, traderId: booking.traderId },
    });

    await paymentsRepository.createPending({
      bookingId: booking.id,
      stripePaymentIntentId: paymentIntent.id,
      amountCents: totalAmount,
      applicationFeeCents: booking.flatFeeCents,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amountCents: totalAmount,
    };
  },
};