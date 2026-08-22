"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  Car,
  CreditCard,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/services/booking.service";
import { MockBooking } from "@/lib/mock-data";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<MockBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        const data = await bookingService.getById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) loadBooking();
  }, [bookingId]);

  const handleConfirm = async () => {
    if (!booking) return;
    setActionLoading(true);
    try {
      const updated = await bookingService.confirm(booking.id);
      setBooking(updated);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking || !confirm("Are you sure you want to cancel this booking?")) return;
    setActionLoading(true);
    try {
      const updated = await bookingService.cancel(booking.id);
      setBooking(updated);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-16 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Booking Not Found</h2>
        <p className="text-sm text-slate-400">The requested booking could not be located.</p>
        <Link href="/bookings">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            Back to Bookings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/bookings">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2 h-9 w-9 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white font-outfit">
                Booking #{booking.id}
              </h1>
              <Badge
                className={`text-xs font-semibold ${
                  booking.status === "CONFIRMED"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : booking.status === "PENDING"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : booking.status === "COMPLETED"
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {booking.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Received on {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {booking.status === "PENDING" && (
            <Button
              disabled={actionLoading}
              onClick={handleConfirm}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 px-4 rounded-xl shadow-lg shadow-emerald-600/20 font-semibold"
            >
              Confirm Appointment
            </Button>
          )}
          {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
            <Button
              variant="outline"
              disabled={actionLoading}
              onClick={handleCancel}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-9 px-4 rounded-xl"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      {/* Grid: Details & Side Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3): Customer & Schedule */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer Information Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <h3 className="text-base font-semibold text-white font-outfit flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-orange-400" /> Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Customer Name</span>
                <p className="text-sm font-bold text-white mt-1">{booking.customer.name}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Phone Contact</span>
                <p className="text-sm font-semibold text-slate-200 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {booking.customer.phone || "Not provided"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 sm:col-span-2">
                <span className="text-xs text-slate-400 font-medium">Email Address</span>
                <p className="text-sm font-semibold text-slate-200 mt-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {booking.customer.email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Scheduling & Buffer Window Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <h3 className="text-base font-semibold text-white font-outfit flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-orange-400" /> Appointment & Travel Window
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Scheduled Service Time</span>
                  <p className="text-base font-bold text-orange-400 mt-0.5">
                    {new Date(booking.scheduledStart).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-slate-300 font-medium mt-0.5">
                    {new Date(booking.scheduledStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — {new Date(new Date(booking.scheduledStart).getTime() + 60 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (60 mins)
                  </p>
                </div>
              </div>

              {/* Travel-Time Buffer Visual Box */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-2">
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <Car className="w-4 h-4" /> Fixed Travel Buffer: 30 Minutes Included
                  </span>
                  <span className="text-[11px] bg-blue-500/20 px-2 py-0.5 rounded-full text-blue-300">
                    Auto-Applied
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  The calendar engine blocks the slot until{" "}
                  <strong className="text-slate-200">
                    {new Date(booking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </strong>{" "}
                  to guarantee travel time to your next customer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Channel & Payment */}
        <div className="space-y-6">
          {/* Intake Channel Info */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <h3 className="text-base font-semibold text-white font-outfit flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-orange-400" /> Intake Channel
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Source</span>
                <Badge
                  variant="outline"
                  className={
                    booking.channel === "WHATSAPP"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold"
                  }
                >
                  {booking.channel}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Normalized into the unified booking pipeline. Auto-replied to the customer with instant confirmation.
              </p>
            </div>
          </div>

          {/* Stripe Billing & Platform Fee */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <h3 className="text-base font-semibold text-white font-outfit flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-orange-400" /> Billing Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Job Price (Placeholder):</span>
                <span className="font-semibold text-white">£50.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Platform Booking Fee:</span>
                <span className="font-semibold text-orange-400">£{(booking.flatFeeCents / 100).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Trader Net Payout:</span>
                <span className="text-emerald-400">£50.00</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Stripe Connect Express Direct Payout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
