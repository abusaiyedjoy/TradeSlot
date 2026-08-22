"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Wrench,
  Search,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_TRADERS, MockTrader } from "@/features/trader/traders-mock";

const CATEGORIES = ["All", "Plumber", "Electrician", "Carpenter", "Painter", "Locksmith"];

export default function FindTradersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredTraders = useMemo(() => {
    let list = [...MOCK_TRADERS];

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query filter (name, skill, work area, bio)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.skills.some((s) => s.toLowerCase().includes(q)) ||
          t.workAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Page Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Find Verified Local Tradespeople
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Browse licensed plumbers, electricians, carpenters, painters, and locksmiths. All bookings include smart 30-minute travel buffers and Stripe escrow protection.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by specialty, skill (e.g. Leak Repair), or London borough..."
                className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Hourly Rate: Low to High</option>
                <option value="price-desc">Hourly Rate: High to Low</option>
              </select>
            </div>
          </div>

          {/* Specialty Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium mr-1">Trade:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredTraders.length}</strong> available professionals</span>
          <span>Guaranteed fixed travel-time buffers on all slots</span>
        </div>

        {/* Traders Grid */}
        {filteredTraders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No traders found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your specialty filter or searching for a different skill or borough.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-orange-600 border-orange-200"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map((trader) => (
              <div
                key={trader.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm card-lift flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={trader.avatar}
                        alt={trader.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 text-base font-outfit">
                            {trader.name}
                          </h3>
                          {trader.verified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-[10px] px-2 py-0.5 mt-0.5 font-medium">
                          {trader.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-extrabold text-slate-900 font-outfit">
                        £{trader.hourlyRate}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/ hour</span>
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {trader.rating}
                    </div>
                    <span className="text-slate-300">•</span>
                    <span>{trader.reviewsCount} verified reviews</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {trader.bio}
                  </p>

                  {/* Skills Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Specialties
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trader.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Coverage Boroughs */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">Covers: {trader.workAreas.join(", ")}</span>
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <Link href={`/book?traderId=${trader.id}`} className="w-full block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-10 rounded-xl shadow-sm shadow-orange-500/20 gap-1.5 justify-center">
                      Book an Appointment <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
