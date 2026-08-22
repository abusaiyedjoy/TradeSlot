"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Zap,
  DollarSign,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50/50 via-white to-slate-50 border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> How TradeSlot Works
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-outfit tracking-tight">
              Booking a reliable trader should take <span className="text-orange-600">seconds</span>, not days.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We built an intelligent scheduling engine that eliminates endless phone tag, auto-applies travel buffers, and securely processes direct payouts through Stripe.
            </p>
          </div>
        </section>

        {/* 3-Step Customer Process */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
              The 3-Step Booking Process
            </h2>
            <p className="text-sm text-slate-600">
              From choosing your specialist to job completion in 3 transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 font-extrabold text-lg flex items-center justify-center font-outfit shadow-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">
                  Choose a Local Verified Trader
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse vetted plumbers, electricians, carpenters, painters, and locksmiths. View verified credentials, pricing, and live customer reviews.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-orange-600 flex items-center gap-1">
                Verified reviews only <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-extrabold text-lg flex items-center justify-center font-outfit shadow-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">
                  Select a Protected Time Slot
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pick your preferred date and time. Our engine automatically applies a mandatory <strong>30-minute travel buffer</strong> to ensure your trader arrives on time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <Car className="w-3.5 h-3.5" /> 30-min buffer guaranteed
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 font-extrabold text-lg flex items-center justify-center font-outfit shadow-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">
                  Instant Confirmation & Stripe Escrow
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive instant WhatsApp & SMS confirmations. Payment is held safely via Stripe Connect and only released directly to the trader upon completion.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero commission gouging
              </div>
            </div>
          </div>
        </section>

        {/* The Buffer System Deep Dive */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 text-xs font-semibold">
                  <Car className="w-3.5 h-3.5 mr-1" /> Smart Scheduling Engine
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900 leading-tight">
                  Why TradeSlot Appointments Never Overlap
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Traditional booking platforms stack appointments back-to-back without accounting for London traffic or London travel time. When one job runs 10 minutes over, the entire afternoon schedule is ruined.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Automatic 30-Minute Transit Buffer:</strong> Added to every job duration to guarantee adequate transit and prep time.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Daily Work Area Enforcement:</strong> Traders specify which London zone they are working in each day so they aren&apos;t crisscrossing the city.
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Schedule Timeline Graphic */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-semibold text-slate-300">Trader Daily Schedule View</span>
                  <span className="text-emerald-400 font-mono">Protected Slots</span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {/* Slot A */}
                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Job 1: Leak Repair (60 min)</span>
                      <span className="text-orange-400">09:00 - 10:00</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Customer: Sarah Jenkins (Soho)</p>
                    <div className="mt-2 p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] flex items-center justify-between">
                      <span className="flex items-center gap-1"><Car className="w-3 h-3" /> Travel Buffer</span>
                      <span>10:00 - 10:30 (Reserved)</span>
                    </div>
                  </div>

                  {/* Slot B */}
                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Job 2: Boiler Servicing (60 min)</span>
                      <span className="text-orange-400">10:30 - 11:30</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Customer: David Miller (Westminster)</p>
                    <div className="mt-2 p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] flex items-center justify-between">
                      <span className="flex items-center gap-1"><Car className="w-3 h-3" /> Travel Buffer</span>
                      <span>11:30 - 12:00 (Reserved)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 text-center">
                  Zero overlaps. Both customer and trader stay on schedule.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Channel Intake Section */}
        <section className="py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> Multi-Channel Pipeline
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
              Book via Web or WhatsApp
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Customers can book through our website widget or by sending a message to our WhatsApp booking bot. All inbound requests are unified into a single scheduling engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                WEB
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">Web Chatbot & Form</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean interactive web booking wizard on any device. Select preferred times, verify costs, and confirm instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                WA
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">WhatsApp Booking Bot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send a quick text like <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">BOOK &lt;date&gt; &lt;time&gt;</code> to lock in appointments on the go with zero apps needed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit">
              Ready to experience hassle-free trade booking?
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Find a certified local professional in minutes or join as a registered trade business today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/find-traders">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-10 px-6 rounded-xl shadow-lg shadow-orange-500/25 gap-1.5">
                  Browse Traders <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 text-xs h-10 px-6 rounded-xl">
                  Sign Up as a Trader
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
