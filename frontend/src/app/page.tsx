"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wrench,
  Search,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  MapPin,
  Car,
  CreditCard,
  MessageSquare,
  Sparkles,
  Zap,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { traderService, PublicTraderRecord } from "@/services/trader.service";

const POPULAR_SERVICES = [
  { name: "Plumber", icon: "🔧", count: "12 local experts", query: "Plumber" },
  { name: "Electrician", icon: "⚡", count: "9 local experts", query: "Electrician" },
  { name: "Carpenter", icon: "🪚", count: "7 local experts", query: "Carpenter" },
  { name: "Painter", icon: "🎨", count: "11 local experts", query: "Painter" },
  { name: "Locksmith", icon: "🔑", count: "6 local experts", query: "Locksmith" },
];

const FAQS = [
  {
    q: "How does TradeSlot prevent traders from arriving late?",
    a: "Our scheduling engine automatically applies a mandatory 30-minute travel-time buffer to every appointment. This guarantees that travel time is reserved on the trader's schedule before their next booking can begin.",
  },
  {
    q: "How does payment work?",
    a: "Payment is held safely in escrow via Stripe Connect. The platform captures a flat £5.00 booking fee, and the remaining job amount transfers directly to the trader's connected account upon job completion.",
  },
  {
    q: "Can I book through WhatsApp as well?",
    a: "Yes! You can book directly through our website form or send a WhatsApp message to our automated booking bot. Both channels feed into the exact same booking pipeline.",
  },
  {
    q: "Are the traders vetted?",
    a: "All traders on TradeSlot undergo credential and business verification before receiving bookings on the platform.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("Plumber");
  const [selectedDate, setSelectedDate] = useState("2026-08-24");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [featuredTraders, setFeaturedTraders] = useState<PublicTraderRecord[]>([]);
  const [loadingTraders, setLoadingTraders] = useState(true);

  useEffect(() => {
    async function loadFeaturedTraders() {
      try {
        const traders = await traderService.listPublicTraders();
        setFeaturedTraders(traders || []);
      } catch (err) {
        console.error("Error loading featured traders from backend API:", err);
      } finally {
        setLoadingTraders(false);
      }
    }
    loadFeaturedTraders();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/find-traders?service=${encodeURIComponent(selectedService)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-orange-200/30 via-amber-100/20 to-orange-100/30 blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-semibold shadow-sm animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              Smart Travel Buffers · Zero Overlaps · Stripe Payouts
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 font-outfit tracking-tight leading-[1.1]">
              Book Trusted Local Traders <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                With Guaranteed Availability
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Find verified plumbers, electricians, carpenters, and locksmiths. Confirm protected appointment slots with automated 30-minute travel buffers.
            </p>

            {/* Hero Interactive Booking Widget */}
            <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xl shadow-slate-200/50">
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
                {/* Specialty */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Trade Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-bold text-xs mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Plumber">Plumbing</option>
                    <option value="Electrician">Electrical</option>
                    <option value="Carpenter">Carpentry</option>
                    <option value="Painter">Painting & Decorating</option>
                    <option value="Locksmith">Locksmith</option>
                  </select>
                </div>

                {/* Date */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-bold text-xs mt-1 focus:outline-none cursor-pointer"
                  />
                </div>

                {/* Preferred Slot */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-bold text-xs mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="09:00">Morning (09:00 AM)</option>
                    <option value="11:30">Midday (11:30 AM)</option>
                    <option value="14:00">Afternoon (02:00 PM)</option>
                    <option value="16:30">Late PM (04:30 PM)</option>
                  </select>
                </div>

                {/* Submit CTA */}
                <Button
                  type="submit"
                  className="w-full h-full min-h-[48px] bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/25 flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" /> Find Trader
                </Button>
              </form>

              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Instant confirmation
                </span>
                <span className="flex items-center gap-1 text-blue-700 font-medium">
                  <Car className="w-3.5 h-3.5 text-blue-500" /> 30-minute travel buffer auto-applied
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Flat £5 booking fee
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
                Popular Trade Specialties
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select a category to view verified local professionals.
              </p>
            </div>
            <Link href="/find-traders" className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              View all specialties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {POPULAR_SERVICES.map((s) => (
              <Link
                key={s.name}
                href={`/find-traders?service=${s.query}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm card-lift text-center space-y-2 group block"
              >
                <div className="text-3xl mb-1">{s.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm font-outfit group-hover:text-orange-600 transition-colors">
                  {s.name}
                </h3>
                <p className="text-[11px] text-slate-500">{s.count}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Verified Traders Preview */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs font-semibold mb-2">
                  Verified Directory
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
                  Featured Top-Rated Specialists
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Ready for instant booking with protected travel buffers.
                </p>
              </div>
              <Link href="/find-traders">
                <Button variant="outline" className="border-slate-300 text-slate-700 text-xs font-semibold">
                  View All Traders
                </Button>
              </Link>
            </div>

            {loadingTraders ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 rounded w-24" />
                        <div className="h-3 bg-slate-200 rounded w-16" />
                      </div>
                    </div>
                    <div className="h-10 bg-slate-200 rounded" />
                    <div className="h-8 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredTraders.slice(0, 3).map((trader) => (
                  <div
                    key={trader.id}
                    className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm card-lift flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={trader.avatar}
                            alt={trader.name}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm font-outfit">{trader.name}</h3>
                              {trader.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                            </div>
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] px-2 py-0">
                              {trader.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-slate-900 text-base">£{trader.hourlyRate}</span>
                          <span className="text-[10px] text-slate-400 block">/hr</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {trader.rating}
                        </div>
                        <span className="text-slate-300">•</span>
                        <span>{trader.reviewsCount} reviews</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {trader.bio}
                      </p>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">
                          {trader.workAreas && trader.workAreas.length > 0
                            ? trader.workAreas.map((w) => w.areaLabel).join(", ")
                            : "London & Greater London"}
                        </span>
                      </div>
                    </div>

                    <Link href={`/book?traderId=${trader.id}`} className="w-full block pt-2">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-9 rounded-xl shadow-sm shadow-orange-500/20 justify-center gap-1">
                        Book Slot <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How It Works & Travel Buffer Featurette */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs font-semibold">
                  Smart Scheduling Architecture
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-outfit leading-tight">
                  No overlapping appointments. <br />
                  <span className="text-orange-400">Guaranteed on-time arrivals.</span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Unlike traditional directories where you request a quote and wait for callbacks, TradeSlot automatically allocates 30-minute transit windows between jobs.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/how-it-works">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-10 px-5 rounded-xl gap-1.5">
                      Explore How It Works <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/for-traders">
                    <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs h-10 px-5 rounded-xl">
                      For Trade Businesses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Graphical Feature Box */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Multi-Channel Intake</h4>
                    <p className="text-xs text-slate-400 mt-0.5">WhatsApp bot & Web chat intake normalized into one calendar pipeline.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automated Travel Buffer</h4>
                    <p className="text-xs text-slate-400 mt-0.5">30-minute buffers auto-injected between jobs to eliminate delay cascades.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stripe Connect Direct Payouts</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Flat £5.00 platform fee with direct payouts into trader bank accounts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about the platform.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-90 text-orange-500" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
