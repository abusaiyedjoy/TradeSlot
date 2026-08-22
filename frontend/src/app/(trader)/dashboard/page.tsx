"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  CreditCard,
  ArrowRight,
  MessageSquare,
  Car,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { bookingService } from "@/services/booking.service";
import { traderService } from "@/services/trader.service";
import { MOCK_TRADER, MockBooking, MockWorkArea, MOCK_DASHBOARD_STATS } from "@/lib/mock-data";

export default function TraderDashboardPage() {
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [workAreas, setWorkAreas] = useState<MockWorkArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [bList, waList] = await Promise.all([
          bookingService.listForTrader(),
          traderService.listWorkAreas(),
        ]);
        setBookings(bList);
        setWorkAreas(waList);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayWorkArea = workAreas.find((w) => w.date === todayStr) || workAreas[0];
  const upcomingBooking = bookings.find((b) => b.status === "CONFIRMED");

  const whatsappCount = bookings.filter((b) => b.channel === "WHATSAPP").length;
  const webchatCount = bookings.filter((b) => b.channel === "WEBCHAT").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Trader Booking Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit tracking-tight">
              Welcome back, {MOCK_TRADER.name}
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Your multi-channel engine is actively routing WhatsApp and web bookings into buffered schedule slots.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/work-area">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-orange-500/20 gap-2">
                <MapPin className="w-4 h-4" />
                {todayWorkArea ? "Update Work Area" : "Set Daily Work Area"}
              </Button>
            </Link>
            <Link href="/payouts">
              <Button variant="outline" className="border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-sm gap-2">
                <CreditCard className="w-4 h-4 text-orange-400" />
                Stripe Payouts
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Active Work Area Callout */}
        {todayWorkArea && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Today&apos;s Active Work Zone:{" "}
              <strong className="text-white font-semibold">{todayWorkArea.areaLabel}</strong> ({todayWorkArea.date})
            </span>
          </div>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-outfit">
              {bookings.length}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +20% this week
            </span>
          </div>
        </div>

        {/* Confirmed Slots */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Confirmed Slots</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-outfit">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </span>
            <span className="text-xs text-slate-400">Buffered & Locked</span>
          </div>
        </div>

        {/* Pending Intake */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-outfit">
              {bookings.filter((b) => b.status === "PENDING").length}
            </span>
            <span className="text-xs text-amber-400 font-semibold">Requires confirmation</span>
          </div>
        </div>

        {/* Total Net Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Net Trader Payouts</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-outfit">
              £{(MOCK_DASHBOARD_STATS.netRevenueCents / 100).toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">Direct via Stripe</span>
          </div>
        </div>
      </div>

      {/* Mid Section: Up Next & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Scheduled Appointment Card */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <h3 className="font-semibold text-white text-base font-outfit">
                  Upcoming Appointment
                </h3>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium">
                Confirmed Slot
              </Badge>
            </div>

            {upcomingBooking ? (
              <div className="mt-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Customer</span>
                    <h4 className="text-base font-bold text-white mt-0.5">{upcomingBooking.customer.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {upcomingBooking.customer.phone || upcomingBooking.customer.email || "Direct Booking"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Scheduled Window</span>
                    <p className="text-sm font-bold text-orange-400 mt-0.5">
                      {new Date(upcomingBooking.scheduledStart).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      at{" "}
                      {new Date(upcomingBooking.scheduledStart).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Duration: 60 mins</p>
                  </div>
                </div>

                {/* Travel Buffer Visualizer */}
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-300">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-400" />
                    <span>Fixed Travel Buffer: <strong>30 minutes</strong> included (ends {new Date(upcomingBooking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})</span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full">
                    Protected
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-8 text-center">No upcoming appointments scheduled today.</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <Link href="/bookings">
              <Button variant="ghost" className="text-orange-400 hover:text-orange-300 text-sm gap-1.5 p-0 hover:bg-transparent">
                View all scheduled bookings <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Multi-Channel Inbound Breakdown */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="font-semibold text-white text-base font-outfit flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              Intake by Channel
            </h3>

            <div className="space-y-3.5">
              {/* WhatsApp */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    WA
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">WhatsApp Bot</h4>
                    <p className="text-xs text-slate-400">Direct instant messaging</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-white">{whatsappCount}</span>
                  <p className="text-[10px] text-emerald-400 font-medium">Active</p>
                </div>
              </div>

              {/* Webchat Widget */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                    WEB
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Web Chatbot</h4>
                    <p className="text-xs text-slate-400">Landing page widget</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-white">{webchatCount}</span>
                  <p className="text-[10px] text-blue-400 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
            Both channels funnel into the same booking engine with zero duplicate bookings.
          </div>
        </div>
      </div>

      {/* Recent Bookings Table Section */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-white text-lg font-outfit">Recent Inbound Bookings</h3>
            <p className="text-xs text-slate-400 mt-0.5">Normalized multi-channel intake stream</p>
          </div>
          <Link href="/bookings">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white text-xs">
              View All Bookings
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Customer</th>
                <th className="pb-3">Channel</th>
                <th className="pb-3">Scheduled Slot</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {bookings.slice(0, 4).map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="font-medium text-white">{b.customer.name}</div>
                    <div className="text-xs text-slate-500">{b.customer.phone || b.customer.email || "No contact"}</div>
                  </td>
                  <td className="py-3.5">
                    <Badge
                      variant="outline"
                      className={`text-[11px] font-semibold ${
                        b.channel === "WHATSAPP"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {b.channel}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-xs text-slate-300">
                    <div>
                      {new Date(b.scheduledStart).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      at{" "}
                      {new Date(b.scheduledStart).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-[10px] text-slate-500">+30m travel buffer</div>
                  </td>
                  <td className="py-3.5">
                    <Badge
                      className={`text-[11px] font-medium ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : b.status === "PENDING"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          : b.status === "COMPLETED"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Link href={`/bookings/${b.id}`}>
                      <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300 text-xs h-8 px-2.5">
                        Details <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
