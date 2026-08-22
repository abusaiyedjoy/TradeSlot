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
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Trader Hub Overview
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
              Good morning, {MOCK_TRADER.name}
            </h1>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Your multi-channel engine is actively routing WhatsApp and webchat customer appointments with protected 30-minute travel buffers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/work-area">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-10 px-4 rounded-xl shadow-sm shadow-orange-500/20 gap-2">
                <MapPin className="w-4 h-4" />
                {todayWorkArea ? "Update Daily Zone" : "Set Today's Zone"}
              </Button>
            </Link>
            <Link href="/payouts">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs h-10 px-4 rounded-xl gap-2 font-semibold">
                <CreditCard className="w-4 h-4 text-orange-500" />
                Stripe Payouts
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Active Work Area Status Callout */}
        {todayWorkArea && (
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Active Work Area for Today:{" "}
              <strong className="text-slate-900 font-bold">{todayWorkArea.areaLabel}</strong> ({todayWorkArea.date})
            </span>
          </div>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-outfit">
              {bookings.length}
            </span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +20% this week
            </span>
          </div>
        </div>

        {/* Confirmed Slots */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Confirmed Slots</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-outfit">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </span>
            <span className="text-xs text-slate-400">Buffered & Locked</span>
          </div>
        </div>

        {/* Pending Review */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Review</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-outfit">
              {bookings.filter((b) => b.status === "PENDING").length}
            </span>
            <span className="text-xs text-amber-600 font-semibold">Requires action</span>
          </div>
        </div>

        {/* Net Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Net Trader Payouts</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-outfit">
              £{(MOCK_DASHBOARD_STATS.netRevenueCents / 100).toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">Direct via Stripe</span>
          </div>
        </div>
      </div>

      {/* Mid Section: Up Next & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Scheduled Appointment Card */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-slate-900 text-base font-outfit">
                  Upcoming Confirmed Appointment
                </h3>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-xs">
                Confirmed Slot
              </Badge>
            </div>

            {upcomingBooking ? (
              <div className="mt-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Customer</span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">{upcomingBooking.customer.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {upcomingBooking.customer.phone || upcomingBooking.customer.email || "Direct Booking"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Scheduled Window</span>
                    <p className="text-sm font-bold text-orange-600 mt-0.5">
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
                    <p className="text-xs text-slate-500 mt-0.5">Service: 60 mins</p>
                  </div>
                </div>

                {/* Travel Buffer Visualizer */}
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-800">
                  <div className="flex items-center gap-2 font-medium">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span>Fixed Travel Buffer: <strong>30 minutes</strong> included (ends {new Date(upcomingBooking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    Protected
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-8 text-center">No upcoming appointments scheduled today.</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <Link href="/bookings">
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 text-xs font-semibold gap-1.5 p-0 hover:bg-transparent">
                View all scheduled bookings <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Multi-Channel Inbound Breakdown */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-bold text-slate-900 text-base font-outfit flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              Intake by Channel
            </h3>

            <div className="space-y-3.5">
              {/* WhatsApp */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-xs font-outfit">
                    WA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">WhatsApp Bot</h4>
                    <p className="text-[11px] text-slate-500">Automated messaging</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-slate-900">{whatsappCount}</span>
                  <p className="text-[10px] text-emerald-600 font-semibold">Active</p>
                </div>
              </div>

              {/* Webchat Widget */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-xs font-outfit">
                    WEB
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Web Chatbot</h4>
                    <p className="text-[11px] text-slate-500">Website widget</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-slate-900">{webchatCount}</span>
                  <p className="text-[10px] text-blue-600 font-semibold">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Both channels route into your single unified schedule.
          </div>
        </div>
      </div>

      {/* Recent Bookings Table Section */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-900 text-lg font-outfit">Recent Inbound Bookings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Normalized multi-channel intake stream</p>
          </div>
          <Link href="/bookings">
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold">
              View All Bookings
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Customer</th>
                <th className="pb-3">Channel</th>
                <th className="pb-3">Scheduled Slot</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {bookings.slice(0, 4).map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="font-semibold text-slate-900 text-xs">{b.customer.name}</div>
                    <div className="text-[11px] text-slate-400">{b.customer.phone || b.customer.email || "No contact"}</div>
                  </td>
                  <td className="py-3.5">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        b.channel === "WHATSAPP"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {b.channel}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-xs text-slate-700">
                    <div className="font-medium">
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
                    <div className="text-[10px] text-slate-400">+30m travel buffer</div>
                  </td>
                  <td className="py-3.5">
                    <Badge
                      className={`text-[10px] font-bold ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : b.status === "PENDING"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : b.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <Link href={`/bookings/${b.id}`}>
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-xs font-semibold h-8 px-2.5 rounded-lg">
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
