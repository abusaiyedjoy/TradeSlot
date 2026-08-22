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
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/services/booking.service";
import { MockBooking, MOCK_TRADER } from "@/lib/mock-data";

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<MockBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await bookingService.getById(bookingId);
        setBooking(data);
      } catch (err) {
        // Fallback demo object if fresh mock id
        setBooking({
          id: bookingId,
          traderId: MOCK_TRADER.id,
          customer: {
            id: "cust-demo",
            name: "Sarah Jenkins",
            phone: "+44 7911 123456",
            email: "sarah@example.com",
          },
          channel: "WEBCHAT",
          status: "CONFIRMED",
          scheduledStart: "2026-08-24T10:00:00.000Z",
          scheduledEnd: "2026-08-24T11:30:00.000Z",
          flatFeeCents: 500,
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="h-16 px-4 md:px-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-white font-outfit">
            Trade<span className="text-orange-500">Slot</span>
          </span>
        </Link>
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
            Trader Portal
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto px-4 py-12 flex-1 animate-fade-up">
        {/* Success Header Box */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10 animate-pulse-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white font-outfit tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Your appointment has been secured and confirmed. The trader has received your details.
          </p>
          <div className="inline-block mt-2">
            <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full font-mono">
              Reference: <strong className="text-orange-400">{bookingId}</strong>
            </span>
          </div>
        </div>

        {/* Booking Card */}
        {booking && (
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Trader & Service Info */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  AC
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-base">Alex Carter</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-400">Certified Plumbing & Heating Specialist</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-semibold text-xs">
                CONFIRMED
              </Badge>
            </div>

            {/* Appointment Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" /> Scheduled Date
                </span>
                <p className="text-sm font-bold text-white">
                  {new Date(booking.scheduledStart).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-orange-400" /> Time Window
                </span>
                <p className="text-sm font-bold text-white">
                  {new Date(booking.scheduledStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — {new Date(new Date(booking.scheduledStart).getTime() + 60 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {/* Travel Buffer Banner */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-300">
              <Car className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <strong>30-Minute Travel Buffer Included:</strong> Trader transit window is reserved until{" "}
                <span className="text-white font-bold">{new Date(booking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>.
              </div>
            </div>

            {/* Customer Details & Payment Summary */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Customer Name:</span>
                <span className="font-semibold text-white">{booking.customer.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contact Phone:</span>
                <span className="font-semibold text-white">{booking.customer.phone || "Provided"}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Charge:</span>
                <span className="font-bold text-emerald-400 text-sm">£55.00</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by Stripe Connect escrow. Payout released automatically.</span>
              </div>
            </div>

            {/* WhatsApp Confirmation Notification Simulator */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <MessageSquare className="w-4 h-4" /> Multi-Channel Confirmation Sent
              </div>
              <p className="text-slate-400 text-[11px]">
                An automated confirmation message was delivered to <strong className="text-slate-200">{booking.customer.phone || "your number"}</strong> via the WhatsApp booking pipeline.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/" className="w-full sm:w-1/2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-2.5 rounded-xl shadow-lg shadow-orange-500/20 gap-2">
                  Return to Home
                </Button>
              </Link>
              <Link href="/book" className="w-full sm:w-1/2">
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white text-xs py-2.5 rounded-xl">
                  Book Another Trader
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TradeSlot. All rights reserved.
      </footer>
    </div>
  );
}
