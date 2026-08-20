"use client"

import * as React from "react"
import Link from "next/link"
import { Search, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

interface TraderDirectoryItem {
  id: string | number
  name: string
  specialty: string
  rating: number
  reviewsCount: number
  avatar: string
  bio: string
  availableStatus: "today" | "tomorrow" | "unavailable"
  location: string
  nextSlot: string
}

const TRADERS_LIST: TraderDirectoryItem[] = [
  {
    id: "jordan-mitchell",
    name: "Jordan Mitchell",
    specialty: "Electrician",
    rating: 4.9,
    reviewsCount: 124,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "Expert residential rewiring and smart home installations with over 12 years of experienc...",
    availableStatus: "today",
    location: "Central London",
    nextSlot: "14:00",
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    specialty: "Interior Decorator",
    rating: 5.0,
    reviewsCount: 88,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "Specializing in minimalist modern interiors and custom color consultations for residenti...",
    availableStatus: "tomorrow",
    location: "North London",
    nextSlot: "Tomorrow 09:00",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    specialty: "Plumber",
    rating: 4.8,
    reviewsCount: 96,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "24/7 emergency leak repairs, bathroom installations, and heating system maintenan...",
    availableStatus: "today",
    location: "Central London",
    nextSlot: "16:30",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    specialty: "Builder",
    rating: 4.9,
    reviewsCount: 112,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "Licensed general contractor handling partition walls, door framing, and structural upgrades.",
    availableStatus: "today",
    location: "West London",
    nextSlot: "15:00",
  },
  {
    id: "david-vance",
    name: "David Vance",
    specialty: "HVAC",
    rating: 4.7,
    reviewsCount: 65,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "Air conditioning installations, boiler servicing, and ventilation heat recovery maintenance.",
    availableStatus: "tomorrow",
    location: "South London",
    nextSlot: "Tomorrow 11:00",
  },
  {
    id: "tom-bradley",
    name: "Tom Bradley",
    specialty: "Handyman",
    rating: 4.8,
    reviewsCount: 140,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80",
    bio: "General home fixtures, furniture assembly, TV wall mounting, and general property fixes.",
    availableStatus: "today",
    location: "Central London",
    nextSlot: "17:00",
  },
]

const CATEGORIES = [
  "All Trades",
  "Electrician",
  "Plumber",
  "Builder",
  "Handyman",
  "Decorator",
  "HVAC",
]

export default function FindTraderPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All Trades")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [locationQuery, setLocationQuery] = React.useState("Central London")

  const filteredTraders = React.useMemo(() => {
    return TRADERS_LIST.filter((trader) => {
      const matchCat =
        selectedCategory === "All Trades" ||
        trader.specialty.toLowerCase().includes(selectedCategory.toLowerCase())
      const matchQuery =
        searchQuery.trim() === "" ||
        trader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trader.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trader.bio.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <>
      <DashboardHeader title="Find a Trader" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Title Header */}
        <div className="space-y-1">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find a tradesperson
          </h2>
          <p className="text-sm text-slate-500">
            Search vetted professionals in your area for your next project.
          </p>
        </div>

        {/* Search & Location Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="What do you need help with?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="relative w-full md:w-72">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 h-auto rounded-xl shadow-sm shadow-emerald-600/20">
            Search
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
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

        {/* Trader Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredTraders.map((trader) => (
            <div
              key={trader.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Header: Avatar, Name, Specialty, Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trader.avatar}
                      alt={trader.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 leading-tight">
                        {trader.name}
                      </h3>
                      <p className="text-xs font-medium text-emerald-600 mt-0.5">
                        {trader.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-800">
                      {trader.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-500 mt-4 line-clamp-2 leading-relaxed">
                  {trader.bio}
                </p>

                {/* Availability and Location row */}
                <div className="flex items-center gap-2 mt-4 text-[11px]">
                  {trader.availableStatus === "today" ? (
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      AVAILABLE TODAY
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      AVAILABLE TOMORROW
                    </span>
                  )}

                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">{trader.location}</span>
                </div>
              </div>

              {/* Bottom footer: Next slot + View & book button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Next slot: </span>
                  <span className="font-bold text-slate-900">{trader.nextSlot}</span>
                </div>

                <Link href={`/dashboard/trader/${trader.id}`}>
                  <Button className="bg-[#0b1329] hover:bg-slate-800 text-white text-xs h-9 px-4 font-semibold rounded-xl">
                    View &amp; book
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
