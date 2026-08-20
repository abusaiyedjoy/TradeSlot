"use client"

import * as React from "react"
import Link from "next/link"
import {
  Star,
  Zap,
  Calendar,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function TraderProfilePage() {
  const [selectedSlot, setSelectedSlot] = React.useState("14:00")

  const slots = ["09:00", "11:30", "14:00", "16:30"]

  return (
    <>
      <DashboardHeader title="Trader Profile" showBack showShare />

      <main className="p-6 md:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card + Services (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Profile Info Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=240&h=240&q=80"
                    alt="Jordan Mitchell"
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight">
                      Jordan Mitchell
                    </h2>
                    <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                      Licensed Electrician • 12 years exp.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        AVAILABLE TODAY
                      </span>
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                        VERIFIED PRO
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl self-start">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-slate-900">4.9</span>
                  <span className="text-xs text-slate-500">(124 reviews)</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-6 leading-relaxed">
                Expert residential electrician specializing in complete home rewiring, smart home technology installation, and emergency fault finding. Proudly serving Central and North London with a focus on safety and reliability.
              </p>
            </div>

            {/* Services & Expertise Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-base">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span>Services &amp; Expertise</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Electrical repairs</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fixing sockets, switches, and lighting fixtures quickly and safely.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Inspection</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Full safety inspections and EICR certificates for landlords and homeowners.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Installation</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Complete wiring for new builds or extensions, and EV charger installs.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">Smart Home</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Installation of Nest/Ring doorbells, thermostats and smart lighting systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Today's Availability & Service Area (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Availability & Booking Widget */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-base text-slate-900">
                Today&apos;s availability
              </h3>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 text-center rounded-xl text-sm font-semibold transition-all ${
                        isSelected
                          ? "border-2 border-emerald-500 text-emerald-700 bg-emerald-50/30"
                          : "border border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link href="/dashboard/book/secure">
                  <Button className="w-full bg-[#0b1329] hover:bg-slate-800 text-white font-semibold py-3 h-auto rounded-xl gap-2 shadow-sm">
                    <Calendar className="h-4 w-4" /> Request a booking
                  </Button>
                </Link>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute">
                    OR
                  </span>
                </div>

                <Link href="/dashboard/messages">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 h-auto rounded-xl gap-2 shadow-sm shadow-emerald-500/20">
                    <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                  </Button>
                </Link>
              </div>

              {/* Footnote */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
                Requests are usually confirmed within 20 minutes. All bookings include a mandatory £25 service fee.
              </p>
            </div>

            {/* Service Area Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900">
                Service area
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Central London &amp; North London</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Mon – Fri, 08:00 – 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
