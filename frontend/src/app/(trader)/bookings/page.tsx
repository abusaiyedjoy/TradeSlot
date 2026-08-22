"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Search,
  Filter,
  Car,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/services/booking.service";
import { MockBooking, BookingStatus, BookingChannel } from "@/lib/mock-data";

export default function BookingsListPage() {
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [channelFilter, setChannelFilter] = useState<string>("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await bookingService.listForTrader();
        setBookings(data);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const handleConfirm = async (id: string) => {
    setActionLoading(id);
    try {
      const updated = await bookingService.confirm(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setActionLoading(id);
    try {
      const updated = await bookingService.cancel(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } finally {
      setActionLoading(null);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.customer.phone && b.customer.phone.includes(searchQuery)) ||
        (b.customer.email && b.customer.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchesChannel = channelFilter === "ALL" || b.channel === channelFilter;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [bookings, searchQuery, statusFilter, channelFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit tracking-tight">
            Bookings & Channel Intake
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Normalized stream of all customer appointments from WhatsApp and Webchat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-orange-500/20 text-orange-400 bg-orange-500/10 px-3 py-1 text-xs">
            {bookings.length} Total Bookings
          </Badge>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, or email..."
            className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-500 pl-10 focus-visible:ring-orange-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          {["ALL", "CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {st}
            </button>
          ))}

          {/* Channel Filter */}
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="ALL">All Channels</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="WEBCHAT">Webchat</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6">Customer</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Scheduled Slot (with Buffer)</th>
                <th className="py-3.5 px-4">Flat Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                    No bookings found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Customer */}
                    <td className="py-4 pl-6">
                      <div className="font-semibold text-white">{b.customer.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {b.customer.phone || b.customer.email || "Direct Booking"}
                      </div>
                    </td>

                    {/* Channel */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${
                          b.channel === "WHATSAPP"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {b.channel}
                      </Badge>
                    </td>

                    {/* Scheduled Slot with Travel Buffer */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-200">
                        {new Date(b.scheduledStart).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        at{" "}
                        {new Date(b.scheduledStart).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Car className="w-3 h-3 text-blue-400" />
                        <span>Buffer until {new Date(b.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </td>

                    {/* Flat Booking Fee */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-white">£{(b.flatFeeCents / 100).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-500 block">platform fee</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <Badge
                        className={`text-xs font-medium ${
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

                    {/* Actions */}
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === "PENDING" && (
                          <Button
                            size="sm"
                            disabled={actionLoading === b.id}
                            onClick={() => handleConfirm(b.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-7 px-2.5 rounded-lg"
                          >
                            Confirm
                          </Button>
                        )}
                        {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={actionLoading === b.id}
                            onClick={() => handleCancel(b.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs h-7 px-2"
                          >
                            Cancel
                          </Button>
                        )}
                        <Link href={`/bookings/${b.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:text-white text-xs h-7 px-2.5 rounded-lg"
                          >
                            Details <ChevronRight className="w-3 h-3 ml-0.5" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
