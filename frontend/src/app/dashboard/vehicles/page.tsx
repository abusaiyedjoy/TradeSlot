"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { VehicleCard } from "@/components/dashboard/vehicle-card"
import { MOCK_VEHICLES, VehicleCategory } from "@/lib/mock-data"

const CATEGORIES: ("All" | VehicleCategory)[] = [
  "All",
  "Car",
  "SUV",
  "Truck",
  "Van",
  "Luxury",
]

export default function VehiclesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<"All" | VehicleCategory>("All")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredVehicles = React.useMemo(() => {
    return MOCK_VEHICLES.filter((vehicle) => {
      const matchCat =
        selectedCategory === "All" || vehicle.category === selectedCategory
      const matchQuery =
        searchQuery.trim() === "" ||
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <>
      <DashboardHeader title="Vehicle Fleet" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Vehicle Fleet Management
            </h2>
            <p className="text-sm text-slate-500">
              Browse, filter, and inspect all fleet vehicles for customer rentals.
            </p>
          </div>
        </div>

        {/* Search & Category filter */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vehicle model, plate number, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#0b1329] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>
    </>
  )
}
