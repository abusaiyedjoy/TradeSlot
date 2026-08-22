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
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Bookings & Channel Intake
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Normalized stream of all customer appointments from WhatsApp and Webchat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="border-orange-200 text-orange-700 bg-orange-50 px-3 py-1 text-xs font-semibold">
            {bookings.length} Total Bookings
          </Badge>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, or email..."
            className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 font-medium">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          {["ALL", "CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}

          {/* Channel Filter */}
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
          >
            <option value="ALL">All Channels</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="WEBCHAT">Webchat</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6">Customer</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Scheduled Slot (with Buffer)</th>
                <th className="py-3.5 px-4">Flat Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    No bookings found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    {/* Customer */}
                    <td className="py-4 pl-6">
                      <div className="font-bold text-slate-900 text-xs font-outfit">{b.customer.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {b.customer.phone || b.customer.email || "Direct Booking"}
                      </div>
                    </td>

                    {/* Channel */}
                    <td className="py-4 px-4">
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

                    {/* Scheduled Slot with Travel Buffer */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 text-xs">
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
                        <Car className="w-3 h-3 text-blue-500" />
                        <span>Buffer until {new Date(b.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </td>

                    {/* Flat Booking Fee */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 text-xs">£{(b.flatFeeCents / 100).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block">platform fee</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
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

                    {/* Actions */}
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === "PENDING" && (
                          <Button
                            size="sm"
                            disabled={actionLoading === b.id}
                            onClick={() => handleConfirm(b.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-8 px-3 rounded-lg shadow-sm"
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
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-semibold h-8 px-2.5 rounded-lg"
                          >
                            Cancel
                          </Button>
                        )}
                        <Link href={`/bookings/${b.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-8 px-2.5 rounded-lg"
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
