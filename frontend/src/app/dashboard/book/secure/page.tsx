"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  Info,
  Lock,
  Calendar,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function SecureBookingPage() {
  const [cardNumber, setCardNumber] = React.useState("•••• •••• •••• 4242")
  const [expiry, setExpiry] = React.useState("08/28")
  const [cvc, setCvc] = React.useState("123")
  const [cardholder, setCardholder] = React.useState("Alex Morgan")
  const [isPaid, setIsPaid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsPaid(true)
    }, 1200)
  }

  return (
    <>
      <DashboardHeader title="Secure Checkout" showSearch={false} />

      <main className="p-6 md:p-12 max-w-5xl mx-auto w-full">
        {isPaid ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm text-center max-w-md mx-auto space-y-5 animate-fade-in">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-slate-500">
                Transaction ID: <span className="font-mono font-bold text-slate-800">ts_84920491</span>
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Your £25.00 deposit has been authorized via Stripe. Jordan Mitchell has been notified and will arrive tomorrow at 11:30 AM.
            </p>

            <Link href="/dashboard/bookings" className="block w-full">
              <Button className="w-full bg-[#0b1329] hover:bg-slate-800 text-white font-semibold py-3 h-auto rounded-xl">
                View in My Bookings
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Payment Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to chat
              </Link>

              <div className="space-y-1">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Secure your booking
                </h2>
                <p className="text-sm text-slate-500">
                  Enter your payment details to confirm the 11:30 AM slot.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                {/* Card Details Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Card details
                  </label>
                  <div className="border border-slate-200 rounded-xl bg-white p-3 space-y-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <CreditCard className="h-4 w-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card number"
                          className="w-full text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <Info className="h-4 w-4 text-slate-300" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC"
                        className="text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Cardholder Name Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    placeholder="Full name"
                    className="w-full border border-slate-200 rounded-xl bg-white px-3.5 py-3 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
                  />
                </div>

                {/* Pay Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0b1329] hover:bg-slate-800 text-white font-semibold py-3.5 h-auto rounded-xl text-sm shadow-sm transition-all duration-200 mt-2"
                >
                  {isLoading ? "Processing Authorization..." : "Pay £25.00"}
                </Button>

                {/* Stripe Lock Footnote */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase pt-2">
                  <Lock className="h-3 w-3 text-emerald-600" />
                  <span>SECURE PAYMENT POWERED BY STRIPE</span>
                </div>
              </form>
            </div>

            {/* Right Column: Booking Summary Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    BOOKING SUMMARY
                  </span>

                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Jordan Mitchell"
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wide">
                        ELECTRICAL REPAIR
                      </span>
                      <h4 className="font-display font-bold text-base text-slate-900 leading-tight">
                        Jordan Mitchell
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Calendar className="h-4 w-4 text-slate-400" /> Tomorrow, 19 August
                    </span>
                    <span className="font-bold text-slate-900">11:30 AM</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Car className="h-4 w-4 text-slate-400" /> Travel buffer
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                      20 MINUTES
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Booking fee</span>
                    <span className="font-bold text-slate-900">£25.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Service deposit</span>
                    <span className="font-bold text-slate-900">£0.00</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-baseline justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    TOTAL TO PAY
                  </span>
                  <span className="font-display text-2xl font-extrabold text-slate-900">
                    £25.00
                  </span>
                </div>

                {/* Callout Notice */}
                <div className="bg-emerald-50/70 text-emerald-800 rounded-2xl p-4 text-[11px] leading-relaxed border border-emerald-100/50">
                  <p>
                    <em>&quot;The platform fee secures your slot and includes 20 minutes of protected travel time for the trader.&quot;</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
