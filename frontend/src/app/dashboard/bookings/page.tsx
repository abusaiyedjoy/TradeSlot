"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RentalStatusBadge } from "@/components/dashboard/rental-status-badge"
import { MOCK_RENTALS, RentalStatus } from "@/lib/mock-data"

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = React.useState<"all" | RentalStatus>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredBookings = React.useMemo(() => {
    return MOCK_RENTALS.filter((r) => {
      const matchStatus = statusFilter === "all" || r.status === statusFilter
      const matchSearch =
        searchQuery === "" ||
        r.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.vehicle_plate.toLowerCase().includes(searchQuery.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [statusFilter, searchQuery])

  return (
    <>
      <DashboardHeader title="My Bookings & Rentals" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              All Bookings &amp; Active Rentals
            </h2>
            <p className="text-sm text-slate-500">
              Track upcoming schedules, ongoing services, and completed jobs.
            </p>
          </div>

          <Link href="/dashboard/find-trader">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm">
              + New Booking
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search customer, vehicle, or plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {(["all", "booked", "ongoing", "completed", "cancelled"] as const).map((status) => {
              const isActive = statusFilter === status
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#0b1329] text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              )
            })}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">ID</th>
                  <th className="py-3.5 px-6">Assigned Vehicle / Service</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Date Range</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-400">
                      #{booking.id}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{booking.vehicle_name}</p>
                      <p className="text-[11px] font-mono text-slate-400">{booking.vehicle_plate}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800">{booking.customer_name}</p>
                      <p className="text-[11px] text-slate-400">{booking.customer_phone}</p>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {booking.start_date} <span className="text-slate-300">→</span> {booking.end_date}
                    </td>
                    <td className="py-4 px-6">
                      <RentalStatusBadge status={booking.status} />
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900 tabular-nums">
                      ${booking.total_amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
