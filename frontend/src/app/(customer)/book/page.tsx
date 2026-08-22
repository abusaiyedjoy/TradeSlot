"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Wrench,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/services/booking.service";
import { MOCK_TRADERS, MockTrader } from "@/features/trader/traders-mock";
import { MOCK_TRADER } from "@/lib/mock-data";

const TIME_SLOTS = [
  "08:30", "10:00", "11:30", "13:30", "15:00", "16:30"
];

function CustomerBookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedTraderId = searchParams.get("traderId");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTrader, setSelectedTrader] = useState<MockTrader>(
    MOCK_TRADERS.find((t) => t.id === preSelectedTraderId) || MOCK_TRADERS[0]
  );
  const [date, setDate] = useState("2026-08-24");
  const [time, setTime] = useState("10:00");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setError("Please fill in your name and phone number.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const requestedStart = new Date(`${date}T${time}:00.000Z`).toISOString();
      const booking = await bookingService.create({
        traderId: selectedTrader.id || MOCK_TRADER.id,
        customerName,
        customerPhone,
        customerEmail,
        requestedStart,
        durationMinutes: 60,
      });

      router.push(`/confirmation/${booking.id}`);
    } catch (err: any) {
      setError(err.message || "Could not complete booking. Slot may conflict with another booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl w-full mx-auto px-4 py-10 flex-1">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
          <span className={step >= 1 ? "text-orange-400 font-bold" : ""}>1. Select Trader</span>
          <span className={step >= 2 ? "text-orange-400 font-bold" : ""}>2. Date & Slot</span>
          <span className={step >= 3 ? "text-orange-400 font-bold" : ""}>3. Confirm & Book</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Select Trader */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-white font-outfit">Choose a Verified Trader</h2>
            <p className="text-sm text-slate-400 mt-1">Select a local licensed professional for your job.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_TRADERS.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTrader(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedTrader.id === t.id
                    ? "bg-orange-500/10 border-orange-500/60 shadow-lg shadow-orange-500/10"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-sm">{t.name}</h4>
                      {t.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <Badge className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0 mt-0.5">
                      {t.category}
                    </Badge>
                    <p className="text-xs text-orange-400 font-semibold mt-1">
                      £{t.hourlyRate}/hr · ★ {t.rating} ({t.reviewsCount})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setStep(2)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 gap-2"
            >
              Continue to Date & Time <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Date & Slot Picker */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white font-outfit">Select Time Slot</h2>
              <p className="text-sm text-slate-400 mt-1">
                Booking with <strong className="text-white">{selectedTrader.name}</strong> ({selectedTrader.category})
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white text-xs gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Change Trader
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <Label htmlFor="datePick" className="text-xs font-semibold text-slate-300">
                Select Appointment Date
              </Label>
              <div className="mt-1.5 relative max-w-xs">
                <Input
                  id="datePick"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-950/60 border-slate-800 text-white text-xs pl-9 focus-visible:ring-orange-500"
                />
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-300 block mb-2">
                Available Starting Slots
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      time === slot
                        ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Buffer Notice */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-3">
              <Car className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <strong>Travel Buffer Guaranteed:</strong> A 30-minute buffer is automatically reserved after your 60-min job to prevent trader delays.
              </div>
            </div>
          </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-slate-800 text-slate-300 text-xs"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 gap-2"
              >
                Continue to Details <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
        </div>
      )}

      {/* STEP 3: Customer Details & Booking Confirmation */}
      {step === 3 && (
        <form onSubmit={handleBookingSubmit} className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-white font-outfit">Your Contact & Confirmation</h2>
            <p className="text-sm text-slate-400 mt-1">
              Enter your details to receive instant confirmation via SMS / WhatsApp.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
            <div>
              <Label htmlFor="custName" className="text-xs font-semibold text-slate-300">
                Full Name *
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="custName"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="bg-slate-950/60 border-slate-800 text-white text-xs pl-9 focus-visible:ring-orange-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor="custPhone" className="text-xs font-semibold text-slate-300">
                Phone Number (for booking confirmation) *
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="custPhone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+44 7911 123456"
                  className="bg-slate-950/60 border-slate-800 text-white text-xs pl-9 focus-visible:ring-orange-500"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor="custEmail" className="text-xs font-semibold text-slate-300">
                Email Address (optional)
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="custEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="bg-slate-950/60 border-slate-800 text-white text-xs pl-9 focus-visible:ring-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Trader:</span>
                <span className="font-bold text-white">{selectedTrader.name} ({selectedTrader.category})</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Scheduled Time:</span>
                <span className="font-bold text-orange-400">{date} at {time}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Job Estimate:</span>
                <span className="font-semibold text-white">£50.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Flat Platform Booking Fee:</span>
                <span className="font-semibold text-orange-400">£5.00</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-emerald-400">£55.00</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Protected by Stripe escrow. Trader is paid directly upon completion.</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              className="border-slate-800 text-slate-300 text-xs"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-lg shadow-orange-500/25 transition-all gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Confirm & Reserve Slot <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

export default function CustomerBookPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="h-16 px-4 md:px-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
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
            Trader Portal Sign In
          </Button>
        </Link>
      </header>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <CustomerBookContent />
      </Suspense>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TradeSlot. All rights reserved.
      </footer>
    </div>
  );
}
