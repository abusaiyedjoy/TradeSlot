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
  XCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CreditCard,
  Zap,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function ForTradersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Built Specifically for UK Tradespeople
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-outfit tracking-tight">
              Stop losing 10+ hours a week to <span className="text-orange-600">phone tag & travel delays</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              TradeSlot handles customer appointment booking automatically with built-in travel buffers, WhatsApp bot intake, and instant Stripe Connect payouts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-11 px-7 rounded-xl shadow-lg shadow-orange-500/25 gap-2">
                  Create Trader Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 text-xs h-11 px-6 rounded-xl">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Pillars for Tradespeople */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
              Why TradeSlot is Better for Your Business
            </h2>
            <p className="text-sm text-slate-600">
              Designed around how real tradespeople work on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-lift space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">
                Automatic Travel Buffers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 30-minute transit buffer is automatically locked after every job. Customers can never double-book you or stack appointments unrealistically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-lift space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">
                Daily Work Area Control
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose the zone or London borough you want to work in each day. Customers only see availability if your daily zone matches.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-lift space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">
                WhatsApp Bot Intake
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customers can text our WhatsApp number to book you directly while you&apos;re under a sink or on a roof. Bookings appear in your schedule instantly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-lift space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-outfit">
                Direct Stripe Connect Payouts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Payments are deposited directly into your bank account. No chasing unpaid invoices or waiting weeks for platform payouts.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <Badge className="bg-slate-100 text-slate-800 border-slate-200 text-xs font-semibold">
                Transparent Model
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
                TradeSlot vs. Traditional Lead Platforms
              </h2>
              <p className="text-sm text-slate-600">
                See why thousands of independent traders are switching to confirmed slot booking.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-4 px-6">Feature</th>
                    <th className="py-4 px-6 text-orange-600 font-extrabold">TradeSlot</th>
                    <th className="py-4 px-6 text-slate-400">Typical Lead Gen Directories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-4 px-6 font-semibold">Cost Model</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Flat £5 booking fee (Zero subscription)
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      £30 - £120/month subscription + £15 - £40 per unvetted lead
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Booking Guarantee</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Confirmed appointments only
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      Shared leads competing against 4 other traders
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Travel Buffers</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated 30-min transit buffers
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      None. You manually juggle your diary.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Payment Flow</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Stripe Express payout
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      Cash or manual bank transfers (delayed invoicing)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold">Multi-Channel Intake</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Webchat + WhatsApp unified
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      Manual email alerts & noisy SMS spam
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Simple 3-Step Setup Guide */}
        <section className="py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
              Get Started in Under 3 Minutes
            </h2>
            <p className="text-sm text-slate-600">
              Zero upfront commitment. Test it out with full control over your calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-outfit">Register Business</h3>
              <p className="text-xs text-slate-600">
                Enter your company name, email, and trade specialty to create your account.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-outfit">Connect Stripe Express</h3>
              <p className="text-xs text-slate-600">
                Link your business bank account through Stripe for automated payouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-outfit">Set Daily Work Area</h3>
              <p className="text-xs text-slate-600">
                Pick where you want to work today and receive confirmed bookings instantly.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-11 px-8 rounded-xl shadow-lg shadow-orange-500/25 gap-2">
                Join TradeSlot as a Trader <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
