"use client"

import * as React from "react"
import Link from "next/link"
import { RentalStatusBadge } from "@/components/dashboard/rental-status-badge"
import type { RentalStatus } from "@/lib/mock-data"

export interface BookingRowItem {
  id: string | number
  service: string
  traderName: string
  traderInitials: string
  date: string
  status: RentalStatus
  price: string
}

const DEFAULT_BOOKINGS: BookingRowItem[] = [
  {
    id: 1,
    service: "Residential Rewiring",
    traderName: "Jordan M.",
    traderInitials: "JM",
    date: "Oct 12, 2023",
    status: "completed",
    price: "$180.00",
  },
  {
    id: 2,
    service: "Emergency Leak Repair",
    traderName: "Tom B.",
    traderInitials: "TB",
    date: "Sep 28, 2023",
    status: "completed",
    price: "$240.00",
  },
  {
    id: 3,
    service: "HVAC Maintenance",
    traderName: "Dave K.",
    traderInitials: "DK",
    date: "Aug 15, 2023",
    status: "cancelled",
    price: "$0.00",
  },
]

export function RecentRentalsTable({
  items = DEFAULT_BOOKINGS,
  seeAllHref = "/dashboard/bookings",
}: {
  items?: BookingRowItem[]
  seeAllHref?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-bold text-slate-900">
          Recent Bookings
        </h3>
        <Link
          href={seeAllHref}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Service</th>
              <th className="pb-3 font-semibold">Trader</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition-colors group">
                <td className="py-4 font-semibold text-slate-800">
                  {row.service}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {row.traderInitials}
                    </div>
                    <span className="text-slate-600 font-medium text-xs">
                      {row.traderName}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-xs text-slate-500">{row.date}</td>
                <td className="py-4">
                  <RentalStatusBadge status={row.status} />
                </td>
                <td className="py-4 text-right font-bold text-slate-900 tabular-nums">
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
