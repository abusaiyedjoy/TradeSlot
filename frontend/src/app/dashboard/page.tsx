"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  CreditCard,
  Car,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentRentalsTable } from "@/components/dashboard/recent-rentals-table"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">
              WELCOME BACK
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, Alex.
            </h2>
            <p className="text-sm text-slate-500">
              What do you need help with today?
            </p>
          </div>

          <Link href="/dashboard/find-trader">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 shadow-sm shadow-emerald-600/20 font-semibold gap-2">
              Find a trader <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid + Up Next Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Active Requests */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>Active Requests</span>
            </div>
            <div className="mt-4">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                1
              </span>
            </div>
          </div>

          {/* Card 2: Completed Jobs */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
              <span>Completed Jobs</span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                14
              </span>
              <Badge variant="success" className="text-xs font-bold px-2 py-0.5">
                +12%
              </Badge>
            </div>
          </div>

          {/* Card 3: Total Invested */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CreditCard className="h-4 w-4 text-slate-400" />
              <span>Total Invested</span>
            </div>
            <div className="mt-4">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                $1,240<span className="text-slate-400 text-2xl font-semibold">.00</span>
              </span>
            </div>
          </div>

          {/* Card 4: Up Next Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-3">
                UP NEXT
              </span>

              {/* Trader Info */}
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Jordan Mitchell"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-900 leading-tight">
                    Jordan Mitchell
                  </h4>
                  <p className="text-xs text-slate-500">Licensed Electrician</p>
                </div>
              </div>

              {/* Booking highlight container */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 space-y-1.5 mb-4">
                <p className="font-bold text-xs text-slate-900">
                  Tomorrow 11:30 AM
                </p>
                <p className="text-[11px] text-slate-600">
                  Residential Rewiring · 2 hrs
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Confirmed
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Car className="h-3 w-3" /> 20 min travel buffer
                  </span>
                </div>
              </div>
            </div>

            <Link href="/dashboard/bookings">
              <Button className="w-full bg-[#0b1329] hover:bg-slate-800 text-white text-xs h-9 font-semibold rounded-xl">
                View booking
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <RecentRentalsTable />

        {/* TradeSlot Elite Care Banner */}
        <div className="bg-[#0b1329] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                TRADESLOT
              </span>
              <h3 className="font-display text-lg font-bold text-white leading-tight">
                TradeSlot Elite Care Guarantee
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every booking is insured up to $1M with verified Stripe escrow protection and 24/7 dedicated dispatch.
              </p>
            </div>
          </div>
          <Link href="#care">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white shrink-0">
              Learn more
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}
