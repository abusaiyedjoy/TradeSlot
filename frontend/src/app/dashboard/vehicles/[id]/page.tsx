"use client"

import * as React from "react"
import Link from "next/link"
import {
  Star,
  Zap,
  Calendar,
  MapPin,
  Clock,
  Gauge,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MOCK_VEHICLES } from "@/lib/mock-data"

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const vehicle =
    MOCK_VEHICLES.find((v) => v.id.toString() === params.id) || MOCK_VEHICLES[0]

  const [startDate, setStartDate] = React.useState("2026-08-25")
  const [endDate, setEndDate] = React.useState("2026-08-28")

  const diffDays = 4
  const estimatedTotal = vehicle.daily_rate * diffDays

  return (
    <>
      <DashboardHeader title="Vehicle Detail & Booking" showBack showShare />

      <main className="p-6 md:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vehicle Details + Features (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vehicle.photo_path || ""}
                    alt={vehicle.name}
                    className="h-24 w-32 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight">
                      {vehicle.name}
                    </h2>
                    <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                      {vehicle.category} • Plate: {vehicle.plate_number}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        AVAILABLE FOR RENTAL
                      </span>
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                        VERIFIED FLEET
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl self-start">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-slate-900">4.9</span>
                  <span className="text-xs text-slate-500">(54 rentals)</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-6 leading-relaxed">
                {vehicle.description}
              </p>

              {/* Specs row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Transmission</span>
                  <p className="font-bold text-slate-900 mt-0.5">{vehicle.transmission}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Fuel Type</span>
                  <p className="font-bold text-slate-900 mt-0.5">{vehicle.fuel_type}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Seats</span>
                  <p className="font-bold text-slate-900 mt-0.5">{vehicle.seats} Passengers</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Mileage</span>
                  <p className="font-bold text-slate-900 mt-0.5">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
              </div>
            </div>

            {/* Features & Amenities Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-base">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span>Included Features &amp; Safety</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {vehicle.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reservation & Availability */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 text-xs font-semibold uppercase">Daily Rate</span>
                  <p className="font-display text-3xl font-extrabold text-slate-900">
                    ${vehicle.daily_rate}
                    <span className="text-sm font-medium text-slate-400">/day</span>
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">
                  Instant confirmation
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Pickup Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Return Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs border border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>${vehicle.daily_rate} × {diffDays} days</span>
                    <span className="font-bold text-slate-900">${estimatedTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Platform Insurance Buffer</span>
                    <span className="font-bold text-emerald-600">Included</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-emerald-600 font-display text-base">${estimatedTotal}</span>
                  </div>
                </div>

                <Link href={`/dashboard/rentals/confirm?vehicleId=${vehicle.id}&days=${diffDays}`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 h-auto rounded-xl gap-2 shadow-sm shadow-emerald-600/20">
                    <Calendar className="h-4 w-4" /> Reserve this vehicle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
