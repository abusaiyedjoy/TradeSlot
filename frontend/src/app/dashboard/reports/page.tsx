"use client"

import * as React from "react"
import { Trophy, TrendingUp, Calendar, ArrowUpRight } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MOCK_MONTHLY_REPORT } from "@/lib/mock-data"

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = React.useState("2026-08")

  const totalMonthlyRevenue = MOCK_MONTHLY_REPORT.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalDaysRented = MOCK_MONTHLY_REPORT.reduce((acc, curr) => acc + curr.days_rented, 0)
  const topVehicle = [...MOCK_MONTHLY_REPORT].sort((a, b) => b.revenue - a.revenue)[0]

  return (
    <>
      <DashboardHeader title="Monthly Reports" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Header & Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Monthly Rental Activity Report
            </h2>
            <p className="text-sm text-slate-500">
              Breakdown of days rented, bookings count, and prorated monthly revenue per vehicle.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Vehicle Highlight Card */}
          <div className="bg-gradient-to-br from-[#0b1329] to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" /> HIGHEST REVENUE VEHICLE
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Top Performer
              </span>
            </div>

            <div className="my-4">
              <h3 className="font-display text-xl font-bold text-white">
                {topVehicle.vehicle_name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {topVehicle.vehicle_plate} • {topVehicle.category}
              </p>
            </div>

            <div className="flex items-baseline justify-between pt-2 border-t border-white/10 text-xs">
              <span className="text-slate-400">{topVehicle.days_rented} days rented</span>
              <span className="font-display text-xl font-extrabold text-emerald-400">
                ${topVehicle.revenue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Monthly Revenue ({selectedMonth})
            </span>
            <div className="my-3">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                ${totalMonthlyRevenue.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Prorated to exact month calendar dates
            </p>
          </div>

          {/* Total Fleet Days */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Fleet Days Rented
            </span>
            <div className="my-3">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                {totalDaysRented} <span className="text-base text-slate-400 font-normal">Days</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Across {MOCK_MONTHLY_REPORT.length} active fleet vehicles
            </p>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 pb-2">
            <h3 className="font-display text-base font-bold text-slate-900">
              Vehicle-by-Vehicle Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rentals spanning month boundaries (e.g. July 29 – Aug 3) are prorated strictly within August.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Vehicle</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6 text-center">Total Bookings</th>
                  <th className="py-3.5 px-6 text-center">Days in Month</th>
                  <th className="py-3.5 px-6 text-right">Revenue Contributed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {MOCK_MONTHLY_REPORT.map((row) => (
                  <tr key={row.vehicle_id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{row.vehicle_name}</p>
                      <p className="text-[11px] font-mono text-slate-400">{row.vehicle_plate}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-600">
                      {row.category}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-800">
                      {row.total_bookings}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-800">
                      {row.days_rented}
                    </td>
                    <td className="py-4 px-6 text-right font-display font-extrabold text-slate-900 text-sm tabular-nums">
                      ${row.revenue.toLocaleString()}
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
