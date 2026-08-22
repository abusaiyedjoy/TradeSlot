"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 font-outfit">Booking Not Found</h2>
        <p className="text-sm text-slate-500">The requested booking could not be located.</p>
        <Link href="/bookings">
          <Button variant="outline" className="border-slate-200 text-slate-700">
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
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 p-2 h-9 w-9 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-outfit">
                Booking #{booking.id}
              </h1>
              <Badge
                className={`text-xs font-bold ${
                  booking.status === "CONFIRMED"
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : booking.status === "PENDING"
                    ? "bg-amber-100 text-amber-700 border-amber-200"
                    : booking.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }`}
              >
                {booking.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9 px-4 rounded-xl shadow-sm"
            >
              Confirm Appointment
            </Button>
          )}
          {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
            <Button
              variant="outline"
              disabled={actionLoading}
              onClick={handleCancel}
              className="border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold h-9 px-4 rounded-xl"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      {/* Grid: Details & Side Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Customer & Schedule */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-orange-500" /> Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Customer Name</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{booking.customer.name}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Phone Contact</span>
                <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {booking.customer.phone || "Not provided"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Email Address</span>
                <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {booking.customer.email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Scheduling & Buffer Window Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-orange-500" /> Appointment & Travel Window
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Scheduled Service Time</span>
                  <p className="text-base font-bold text-orange-600 mt-0.5 font-outfit">
                    {new Date(booking.scheduledStart).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    {new Date(booking.scheduledStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — {new Date(new Date(booking.scheduledStart).getTime() + 60 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (60 mins)
                  </p>
                </div>
              </div>

              {/* Travel-Time Buffer Visual Box */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <Car className="w-4 h-4 text-blue-600" /> Fixed Travel Buffer: 30 Minutes Included
                  </span>
                  <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded-full text-blue-800">
                    Auto-Applied
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Your calendar blocks appointments until{" "}
                  <strong className="text-slate-900">
                    {new Date(booking.scheduledEnd).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </strong>{" "}
                  to guarantee travel time to your next customer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Channel & Payment */}
        <div className="space-y-6">
          {/* Intake Channel Info */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-orange-500" /> Intake Channel
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Source</span>
                <Badge
                  variant="outline"
                  className={
                    booking.channel === "WHATSAPP"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-xs"
                      : "bg-blue-50 text-blue-700 border-blue-200 font-bold text-xs"
                  }
                >
                  {booking.channel}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Normalized into the unified booking pipeline. Auto-replied to the customer with instant confirmation.
              </p>
            </div>
          </div>

          {/* Stripe Billing & Platform Fee */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-orange-500" /> Billing Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Job Price (Placeholder):</span>
                <span className="font-semibold text-slate-900">£50.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Booking Fee:</span>
                <span className="font-semibold text-orange-600">£{(booking.flatFeeCents / 100).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                <span>Trader Net Payout:</span>
                <span className="text-emerald-600">£50.00</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Stripe Connect Express Direct Payout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
