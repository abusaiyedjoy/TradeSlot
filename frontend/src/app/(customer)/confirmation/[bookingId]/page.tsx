"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { bookingService, BookingRecord } from "@/services/booking.service";

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await bookingService.getById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking confirmation:", err);
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      <SiteHeader />

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto px-4 py-12 flex-1 animate-fade-up">
        {/* Success Header Box */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your appointment has been reserved. Your trader has received your details and time slot.
          </p>
          <div className="inline-block mt-2">
            <span className="text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full font-mono shadow-sm">
              Booking Reference: <strong className="text-orange-600 font-bold">{bookingId}</strong>
            </span>
          </div>
        </div>

        {/* Booking Card */}
        {booking && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
            {/* Trader & Service Info */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-extrabold text-base font-outfit shadow-sm">
                  TS
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base font-outfit">Verified Specialist</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-500">TradeSlot Certified Professional</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-bold text-xs">
                {booking.status}
              </Badge>
            </div>

            {/* Appointment Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" /> Scheduled Date
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {new Date(booking.scheduledStart).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-orange-500" /> Time Window
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {new Date(booking.scheduledStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — {new Date(new Date(booking.scheduledStart).getTime() + 60 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {/* Travel Buffer Banner */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-xs text-blue-900">
              <Car className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <strong>30-Minute Travel Buffer Included:</strong> Trader transit window is protected until{" "}
                <span className="text-blue-950 font-bold">{new Date(booking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>.
              </div>
            </div>

            {/* Customer Details & Payment Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Customer Name:</span>
                <span className="font-semibold text-slate-900">{booking.customer?.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Contact:</span>
                <span className="font-semibold text-slate-900">{booking.customer?.phone || booking.customer?.email || "Provided"}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Charge:</span>
                <span className="font-bold text-emerald-600 text-sm">£55.00</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by Stripe Connect escrow. Payout released upon completion.</span>
              </div>
            </div>

            {/* WhatsApp Confirmation Notification Simulator */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> Multi-Channel Confirmation Sent
              </div>
              <p className="text-slate-600 text-[11px]">
                An automated confirmation message was delivered to <strong className="text-slate-900">{booking.customer?.phone || "your contact"}</strong> via the TradeSlot booking pipeline.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/" className="w-full sm:w-1/2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm shadow-orange-500/20">
                  Return to Home
                </Button>
              </Link>
              <Link href="/find-traders" className="w-full sm:w-1/2">
                <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold py-2.5 rounded-xl">
                  Browse More Traders
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
