"use client";

import React, { useState, useMemo } from "react";
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
  Lock,
  DollarSign,
  TrendingUp,
  MapPin,
  Menu,
  X,
  CreditCard,
  Building,
  Check,
  Percent,
  ThumbsUp,
  User,
  Phone,
  Mail,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { MOCK_TRADERS, MockTrader } from "@/features/trader/traders-mock";

export default function HomePage() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Booking Widget State
  const [heroService, setHeroService] = useState("Plumber");
  const [heroDate, setHeroDate] = useState("");
  const [heroTime, setHeroTime] = useState("09:00");
  const [heroStatus, setHeroStatus] = useState<"idle" | "searching" | "found" | "empty">("idle");
  const [matchedTraders, setMatchedTraders] = useState<MockTrader[]>([]);

  // Directory Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("default");

  // Booking Flow State
  const [selectedTrader, setSelectedTrader] = useState<MockTrader | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("09:00");
  const [durationHours, setDurationHours] = useState(2);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Search in Hero Widget
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroDate) {
      alert("Please select a date first");
      return;
    }
    setHeroStatus("searching");
    setTimeout(() => {
      const matches = MOCK_TRADERS.filter(
        (trader) => trader.category.toLowerCase() === heroService.toLowerCase()
      );
      if (matches.length > 0) {
        setMatchedTraders(matches);
        setHeroStatus("found");
      } else {
        setMatchedTraders([]);
        setHeroStatus("empty");
      }
    }, 1200);
  };

  // Filter & Sort Directory Traders
  const filteredTraders = useMemo(() => {
    let list = [...MOCK_TRADERS];

    // Specialty filter
    if (selectedCategory !== "All") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.skills.some((s) => s.toLowerCase().includes(q)) ||
          t.workAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Price sorting
    if (priceSort === "asc") {
      list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (priceSort === "desc") {
      list.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    return list;
  }, [selectedCategory, searchQuery, priceSort]);

  // Open booking modal
  const handleOpenBooking = (trader: MockTrader) => {
    setSelectedTrader(trader);
    setBookingStep(1);
    setBookingDate(heroDate || new Date().toISOString().split("T")[0]);
    setBookingTime(heroTime || "09:00");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
  };

  // Handle booking form submission (Details step)
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail || !bookingDate || !bookingTime) {
      alert("Please fill in all booking information fields");
      return;
    }
    setBookingStep(2);
  };

  // Handle payment confirmation
  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      alert("Please fill in all credit card details");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingId("bk-" + Math.floor(100000 + Math.random() * 900000));
      setBookingStep(3);
    }, 1800);
  };

  // Pricing constants (reused)
  const FLAT_BOOKING_FEE_CENTS = 500; // $5.00
  const hourlyTotal = selectedTrader ? selectedTrader.hourlyRate * durationHours : 0;
  const grandTotal = hourlyTotal + FLAT_BOOKING_FEE_CENTS / 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Trade<span className="text-emerald-600">Slot</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-950 transition-colors">How It Works</a>
            <a href="#traders" className="hover:text-slate-950 transition-colors">Find a Trader</a>
            <a href="#for-traders" className="hover:text-slate-950 transition-colors">For Traders</a>
            <a href="#faq" className="hover:text-slate-950 transition-colors">FAQs</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <a href="#traders">
              <Button size="sm">Book a Trader</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-slate-700 hover:text-emerald-600"
            >
              How It Works
            </a>
            <a
              href="#traders"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-slate-700 hover:text-emerald-600"
            >
              Find a Trader
            </a>
            <a
              href="#for-traders"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-slate-700 hover:text-emerald-600"
            >
              For Traders
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-slate-700 hover:text-emerald-600"
            >
              FAQs
            </a>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <a href="#traders" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Book a Trader</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100 py-16 sm:py-24">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-1/4 -translate-y-12 translate-x-12 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 translate-y-12 -translate-x-12 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Text content */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="success" className="py-1 px-3 text-xs uppercase tracking-wide gap-1">
                <Zap className="h-3 w-3 fill-emerald-600" /> Vetted & Insured Local Professionals
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Book Today. <br />
                <span className="text-emerald-600">Trade Tomorrow.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with verified local professionals for plumbing, electrical wiring, custom carpentry, wall painting, and emergency security in seconds. Vetted experts, transparent pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="#traders">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Browse All Traders <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </a>
              </div>

              {/* Mini Stats row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 max-w-lg">
                <div>
                  <h3 className="font-display text-3xl font-extrabold text-slate-900">4.9/5</h3>
                  <p className="text-xs text-slate-500 mt-1">Average Rating</p>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-extrabold text-slate-900">12K+</h3>
                  <p className="text-xs text-slate-500 mt-1">Completed Jobs</p>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-extrabold text-slate-900">20 Mins</h3>
                  <p className="text-xs text-slate-500 mt-1">Average Response</p>
                </div>
              </div>
            </div>

            {/* Hero Scheduling Widget Card */}
            <div className="lg:col-span-5">
              <Card className="shadow-2xl border-slate-100/80 glass-effect p-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-600" /> Book an Appointment
                  </CardTitle>
                  <CardDescription>Select a category and slot to find ready professionals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleHeroSearch} className="space-y-4">
                    {/* Category Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Service Needed</label>
                      <select
                        value={heroService}
                        onChange={(e) => setHeroService(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Plumber">Plumber (Leak repairs, piping)</option>
                        <option value="Electrician">Electrician (Smart home, diagnostics)</option>
                        <option value="Carpenter">Carpenter (Shelving, framing)</option>
                        <option value="Painter">Painter (Walls, interior styling)</option>
                        <option value="Locksmith">Locksmith (Locks, security)</option>
                      </select>
                    </div>

                    {/* Date picker */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Date</label>
                        <input
                          type="date"
                          value={heroDate}
                          onChange={(e) => setHeroDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          required
                        />
                      </div>

                      {/* Time selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Preferred Time</label>
                        <select
                          value={heroTime}
                          onChange={(e) => setHeroTime(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="08:00">Morning (08:00 AM)</option>
                          <option value="11:00">Midday (11:00 AM)</option>
                          <option value="14:00">Afternoon (02:00 PM)</option>
                          <option value="17:00">Evening (05:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-2" size="md">
                      <Search className="h-4 w-4 mr-2" /> Search Slots
                    </Button>
                  </form>

                  {/* Booking Widget Interactive Status Panel */}
                  <div className="border-t border-slate-100 pt-4">
                    {heroStatus === "searching" && (
                      <div className="flex flex-col items-center py-6 text-slate-500 gap-3">
                        <div className="h-8 w-8 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
                        <p className="text-sm font-medium">Checking live trader schedules...</p>
                      </div>
                    )}

                    {heroStatus === "found" && (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-100" />
                          Found {matchedTraders.length} available {heroService}s on this date!
                        </p>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                          {matchedTraders.map((trader) => (
                            <div
                              key={trader.id}
                              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-100 bg-slate-50/50 hover:bg-white transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={trader.avatar}
                                  alt={trader.name}
                                  className="h-9 w-9 rounded-full object-cover border border-slate-100"
                                />
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1">
                                    {trader.name}
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {trader.rating}</span>
                                    <span>•</span>
                                    <span>${trader.hourlyRate}/hr</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenBooking(trader)}
                                className="h-8 text-xs py-0 px-3 bg-white group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600"
                              >
                                Book Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {heroStatus === "empty" && (
                      <div className="text-center py-6 text-slate-500">
                        <p className="text-sm font-medium">No available slots found for this selection.</p>
                        <p className="text-xs text-slate-400 mt-1">Try another category or choose a different date.</p>
                      </div>
                    )}

                    {heroStatus === "idle" && (
                      <div className="text-center py-6 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        <Clock className="h-6 w-6 mx-auto mb-1.5 text-slate-300" />
                        <p className="text-xs font-medium">Select criteria and search to check availability</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner / Social Proof logos */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by homeowners and local businesses across the country
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-40 grayscale">
            <div className="flex items-center gap-1.5 font-semibold text-lg text-slate-800">
              <Building className="h-5 w-5" /> BuildCorp
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-lg text-slate-800">
              <Zap className="h-5 w-5" /> MetroPower
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-lg text-slate-800">
              <Wrench className="h-5 w-5" /> FixItClub
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-lg text-slate-800">
              <ShieldCheck className="h-5 w-5" /> SecureGroup
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-3">Simplicity First</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get the Right Trader in 3 Easy Steps
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              We have eliminated the hassle of calling around, leaving voicemails, and negotiating rates. Here is how simple booking a trader can be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-display text-xl font-bold mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                1
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Specify Your Project</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Choose the service category (plumbing, electrical work, painting, carpentry, or locksmithing) and pick a convenient date and time slot.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-display text-xl font-bold mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                2
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Compare Vetted Professionals</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Browse our directory of matches with real-time slot availability, fixed hourly rates, customer ratings, and reviews.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-display text-xl font-bold mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                3
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-3">Book and Pay Securely</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Confirm your slot instantly with a small flat fee. Pay the trader securely online via Stripe integration once the job is completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mobile Showcase Section */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Showcase text */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="success">Always Connected</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                A Unified Experience Built for Both Sides
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you are a homeowner booking a service or a local professional managing your daily calendar, TradeSlot provides a streamlined, real-time environment.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-slate-900">Instant Calendar Sync</h4>
                    <p className="text-sm text-slate-500 mt-1">Bookings automatically sync and reserve time blocks, calculated with buffer slots for travel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-slate-900">Automated Job Notifications</h4>
                    <p className="text-sm text-slate-500 mt-1">Traders receive real-time updates when new slots are booked, ongoing details change, or payments succeed.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Visual: Phone container and stats bubble */}
            <div className="lg:col-span-6 flex justify-center relative">
              {/* Decorative Blur BG */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/50 rounded-full blur-[80px]" />

              {/* Phone Wrapper */}
              <div className="relative border-[8px] border-slate-900 rounded-[40px] shadow-2xl overflow-hidden bg-slate-950 w-[280px] h-[560px] flex flex-col">
                {/* Speaker/Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-2xl z-10 flex items-center justify-center">
                  <div className="h-1.5 w-12 bg-slate-800 rounded-full" />
                </div>

                {/* Phone screen content */}
                <div className="flex-1 bg-slate-900 text-white flex flex-col p-4 pt-8 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      <Wrench className="h-4 w-4 text-emerald-500" />
                      <span className="font-display text-xs font-bold">TradeSlot Mobile</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="bg-slate-800/70 rounded-2xl p-4 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">Incoming Job</span>
                      <Badge variant="success" className="text-[8px] px-1.5 py-0">PENDING</Badge>
                    </div>
                    <h4 className="text-xs font-bold">Emergency Piping Leak Repair</h4>
                    <div className="flex flex-col gap-1 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1"><User className="h-3 w-3" /> Mr. Arthur Pendelton</div>
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Aug 21, 2026 • 2:00 PM</div>
                    </div>
                    <div className="flex gap-2 pt-1.5">
                      <Button className="flex-1 h-7 text-[10px] rounded-lg bg-emerald-600 hover:bg-emerald-500">Accept</Button>
                      <Button className="flex-1 h-7 text-[10px] rounded-lg bg-transparent border border-white/10 hover:bg-white/5">Decline</Button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">Upcoming Shifts</span>
                    <div className="bg-slate-800/40 rounded-xl p-3 border border-white/5 flex justify-between items-center text-[10px]">
                      <div>
                        <p className="font-bold">North London Area</p>
                        <p className="text-[9px] text-slate-500">Friday, Aug 21</p>
                      </div>
                      <Badge className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border-none">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Dashboard Widget Card 1 */}
              <div className="absolute top-12 -left-4 sm:left-4 bg-white/90 backdrop-blur border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce [animation-duration:6s]">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Weekly Earnings</p>
                  <p className="text-lg font-extrabold text-slate-900">$1,420.50</p>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-16 -right-4 sm:right-4 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-3 animate-bounce [animation-duration:5s]">
                <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Escrow Payout</p>
                  <p className="text-xs font-bold">Stripe Instant Transfer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Trader Directory */}
      <section id="traders" className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="success" className="mb-3">Verified Fleet</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Compare and Book Local Specialists
            </h2>
            <p className="text-slate-500 mt-3">
              Filter by specialty, search skills, and sort by rate. Select a specialist to book them instantly.
            </p>
          </div>

          {/* Directory Toolbar / Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {["All", "Plumber", "Electrician", "Carpenter", "Painter", "Locksmith"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input and Sorting select */}
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search skills or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm font-medium text-slate-700 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="default">Sort: Recommended</option>
                <option value="asc">Rate: Low to High</option>
                <option value="desc">Rate: High to Low</option>
              </select>
            </div>
          </div>

          {/* Directory Listings Grid */}
          {filteredTraders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
              <Search className="h-10 w-10 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-600 font-bold">No match found</p>
              <p className="text-slate-400 text-sm mt-1">Try resetting filters or modifying search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTraders.map((trader) => (
                <Card key={trader.id} className="group overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    {/* Header: Avatar and verified badge */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="h-14 w-14 rounded-2xl object-cover border border-slate-100 shadow-sm"
                        />
                        <div>
                          <h3 className="font-display text-lg font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                            {trader.name}
                            {trader.verified && (
                              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 fill-emerald-50" />
                            )}
                          </h3>
                          <p className="text-sm font-medium text-emerald-600 mt-0.5">{trader.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-xl">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {trader.rating}
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 mt-4 line-clamp-2 leading-relaxed">{trader.bio}</p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {trader.skills.map((skill) => (
                        <Badge key={skill} variant="default" className="text-[10px] px-2 py-0.5 font-semibold bg-slate-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Coverage Area details */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>Covers: {trader.workAreas.join(", ")}</span>
                    </div>
                  </div>

                  <CardFooter className="flex items-center justify-between pt-0">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Hourly Rate</p>
                      <p className="font-display text-2xl font-extrabold text-slate-950">${trader.hourlyRate}<span className="text-sm font-medium text-slate-400">/hr</span></p>
                    </div>
                    <Button onClick={() => handleOpenBooking(trader)} className="h-10 text-sm">
                      Book {trader.name.split(" ")[0]}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Secure Payments & Features */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Visual payment graphic on left */}
            <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-xl max-w-sm w-full space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Secure Payment</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">Powered by Stripe</span>
                </div>

                {/* Styled Credit Card Mockup */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg shadow-emerald-700/10 space-y-8">
                  <div className="flex justify-between items-start">
                    <span className="font-display text-lg font-bold">TradeSlot booking</span>
                    <CreditCard className="h-6 w-6 opacity-80" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-200 uppercase font-semibold tracking-widest">Card number</p>
                    <p className="font-mono text-base tracking-widest mt-0.5">•••• •••• •••• 4242</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Flat Booking Fee</span>
                    <span className="font-semibold text-slate-700">$5.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Deposit held in escrow</span>
                    <span className="font-semibold text-slate-700">Fully Protected</span>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="flex justify-between text-sm font-bold text-slate-900">
                    <span>Safe Transfer</span>
                    <span className="text-emerald-600">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features content on right */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="success">Stripe Partner</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Safe, Secure, and Guaranteed Bookings
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Your piece of mind is our priority. We employ robust escrow mechanisms so you can schedule bookings with confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900">Vetted Professionals</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Every professional goes through rigorous identity, license, and background audits.</p>
                </div>

                <div className="space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900">Escrow Protections</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Payments are held securely and released only after you approve that the work is finished.</p>
                </div>

                <div className="space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900">Fixed Hourly Rates</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">No surprise invoices or arbitrary price changes. Pay the advertised fixed hourly rate.</p>
                </div>

                <div className="space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ThumbsUp className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900">24/7 Priority Support</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Our support agents are always online to resolve disputes, cancel bookings, or reschedule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trader Dashboard Preview */}
      <section id="for-traders" className="py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-1/4 -translate-y-12 translate-x-12 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: text */}
            <div className="lg:col-span-5 space-y-6">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-semibold uppercase tracking-wide px-3 py-1 text-xs">For Local Traders</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.2]">
                Are You a Professional Local Trader?
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Join TradeSlot to grow your business, receive direct calendar bookings, structure travel schedules, and secure guaranteed payouts.
              </p>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>No lead-generation bidding fees (you keep 95%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Set your own hourly rate and work radius postcode</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Guaranteed payments automatically protected by Stripe Connect</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 border-none">
                  Apply to Join Fleet
                </Button>
              </div>
            </div>

            {/* Right Column: Dashboard preview panel */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950/80 rounded-3xl p-6 border border-white/5 shadow-2xl space-y-6 glass-dark">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div>
                    <h3 className="font-display text-base font-bold">Trader Analytics Portal</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Real-time scheduling and escrow payouts</p>
                  </div>
                  <Badge variant="success" className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border-none">
                    Stripe Active
                  </Badge>
                </div>

                {/* Dashboard Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">August Revenue</p>
                    <p className="text-xl font-extrabold text-white mt-1">$4,180</p>
                    <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-0.5">
                      <TrendingUp className="h-2.5 w-2.5" /> +14% vs July
                    </p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Booked Slots</p>
                    <p className="text-xl font-extrabold text-white mt-1">28 Jobs</p>
                    <p className="text-[9px] text-slate-400 mt-1">3 pending reviews</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Escrow Balance</p>
                    <p className="text-xl font-extrabold text-white mt-1">$350</p>
                    <p className="text-[9px] text-slate-400 mt-1">Releasing Friday</p>
                  </div>
                </div>

                {/* Live booking records list */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings Queue</p>
                  <div className="space-y-2">
                    <div className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl p-3 flex justify-between items-center transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          JD
                        </div>
                        <div>
                          <p className="text-xs font-bold">John Donaldson</p>
                          <p className="text-[10px] text-slate-500">Postcode SW1A • Boiler Inspection</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">$135.00</p>
                        <Badge className="text-[8px] bg-emerald-500/10 text-emerald-400 border-none px-1.5 py-0">Aug 22 • 10:00 AM</Badge>
                      </div>
                    </div>

                    <div className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl p-3 flex justify-between items-center transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          ML
                        </div>
                        <div>
                          <p className="text-xs font-bold">Megan Lin</p>
                          <p className="text-[10px] text-slate-500">Postcode N1C • Light Switches Rewire</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">$215.00</p>
                        <Badge className="text-[8px] bg-amber-500/10 text-amber-400 border-none px-1.5 py-0">Aug 23 • 2:00 PM</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Collapsible FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-3">Answers</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight animate-fade-in">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              Got questions about booking, payments, or registrations? Find answers here.
            </p>
          </div>

          <Accordion>
            <AccordionItem title="Are the traders on TradeSlot fully vetted and insured?" name="faq-group">
              Yes, absolutely. Every professional applying to list on TradeSlot undergoes standard identity checks, license checks, proof of address validation, and must upload proof of public liability insurance (minimum $1M coverage). Vetting is reviewed periodically.
            </AccordionItem>
            <AccordionItem title="How does the secure escrow payment system work?" name="faq-group">
              When you confirm a booking, we charge a flat $5.00 scheduling fee. The actual service amount (hourly rate multiplied by booked hours) is authorized via Stripe. The funds are securely held in escrow and are only released to the trader's bank account once you confirm the job is finished.
            </AccordionItem>
            <AccordionItem title="What is the cancellation policy?" name="faq-group">
              You can cancel or reschedule any booking free of charge up to 24 hours before the scheduled start time. Cancellations made within 24 hours of the booking start time may be subject to a cancellation fee equivalent to 1 hour of the trader's service rate.
            </AccordionItem>
            <AccordionItem title="How is the travel buffer calculated?" name="faq-group">
              Our scheduling algorithm adds a default 30-minute travel buffer immediately before and after every booking. This guarantees that traders are not booked back-to-back in different postcodes, preventing overlaps and tardiness.
            </AccordionItem>
            <AccordionItem title="How do I register as a trader on the platform?" name="faq-group">
              You can apply by clicking the "Apply to Join Fleet" button. You will be prompted to create an account, upload your credentials (trade certificate, public liability insurance policy), set your work postcodes, and connect your bank account via Stripe Connect.
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 10. CTA Block */}
      <section className="bg-emerald-950 py-16 sm:py-20 relative overflow-hidden">
        {/* Glow detail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Ready to Get Your Project Done?
          </h2>
          <p className="text-emerald-100 max-w-xl mx-auto text-base sm:text-lg">
            Stop waiting. Book a verified professional plumber, electrician, painter, carpenter, or locksmith in less than two minutes.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#traders">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-950 hover:bg-slate-100 border-none shadow-xl font-bold">
                Book a Trader Now
              </Button>
            </a>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10">
              Speak with Support
            </Button>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Wrench className="h-5 w-5 text-emerald-500" />
              <span className="font-display text-xl font-bold tracking-tight">TradeSlot</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vetted local professionals, scheduled in minutes. Premium service guarantees and secure Stripe Connect escrows.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">Book Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#traders" className="hover:text-white transition-colors">Find a Plumber</a></li>
              <li><a href="#traders" className="hover:text-white transition-colors">Find an Electrician</a></li>
              <li><a href="#traders" className="hover:text-white transition-colors">Find a Carpenter</a></li>
              <li><a href="#traders" className="hover:text-white transition-colors">Find a Painter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">For Professionals</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#for-traders" className="hover:text-white transition-colors">Join TradeSlot Fleet</a></li>
              <li><a href="#for-traders" className="hover:text-white transition-colors">Stripe Payouts Info</a></li>
              <li><a href="#for-traders" className="hover:text-white transition-colors">Insurance Requirements</a></li>
              <li><a href="#for-traders" className="hover:text-white transition-colors">Developer API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} TradeSlot Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>

      {/* 12. Reusable Booking Dialog Workflow */}
      <Dialog
        isOpen={selectedTrader !== null}
        onClose={() => setSelectedTrader(null)}
        title={selectedTrader ? `Book ${selectedTrader.name}` : "Book appointment"}
      >
        {selectedTrader && (
          <div className="space-y-4">
            {/* Step indicator */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
              <span className={bookingStep === 1 ? "text-emerald-600 font-bold" : ""}>1. Details</span>
              <ChevronRight className="h-3 w-3" />
              <span className={bookingStep === 2 ? "text-emerald-600 font-bold" : ""}>2. Payment</span>
              <ChevronRight className="h-3 w-3" />
              <span className={bookingStep === 3 ? "text-emerald-600 font-bold" : ""}>3. Confirmed</span>
            </div>

            {/* Step 1: Customer Details & Booking Slots */}
            {bookingStep === 1 && (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <img
                    src={selectedTrader.avatar}
                    alt={selectedTrader.name}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedTrader.name}</h4>
                    <p className="text-xs text-slate-500">{selectedTrader.category} • ${selectedTrader.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="+1 555-0199"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Start Time</label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Duration</label>
                      <select
                        value={durationHours}
                        onChange={(e) => setDurationHours(parseInt(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="1">1 Hour</option>
                        <option value="2">2 Hours</option>
                        <option value="4">4 Hours (Half Day)</option>
                        <option value="8">8 Hours (Full Day)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Subtotal fee box */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span>Labor Cost ({durationHours} hours @ ${selectedTrader.hourlyRate}/hr)</span>
                    <span className="font-bold text-slate-900">${hourlyTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Platform Booking Fee</span>
                    <span>$5.00</span>
                  </div>
                  <hr className="border-slate-200/60" />
                  <div className="flex justify-between text-sm font-bold text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-emerald-600 font-extrabold text-base">${grandTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    * The flat platform booking fee of $5.00 is billed now to reserve the slot. Labor cost is authorized now but held securely in escrow until work completes.
                  </p>
                </div>

                <Button type="submit" className="w-full h-11">
                  Proceed to Payment <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>
            )}

            {/* Step 2: Payment Details (Stripe Mockup form) */}
            {bookingStep === 2 && (
              <form onSubmit={handleConfirmPayment} className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Stripe Escrow Guarantee</p>
                      <p className="text-[10px] text-slate-500">Secure 256-bit encryption</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">${grandTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">CVC / CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setBookingStep(1)}
                    disabled={isSubmitting}
                    className="flex-1 h-11"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] h-11 bg-emerald-600 hover:bg-emerald-500"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authorizing...
                      </span>
                    ) : (
                      `Pay & Confirm Booking`
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Confirmation / Success screen */}
            {bookingStep === 3 && (
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-xl font-bold text-slate-900">Booking Confirmed!</h4>
                  <p className="text-xs text-slate-400 font-medium">Booking ID: <span className="font-mono text-slate-950 font-bold">{bookingId}</span></p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{customerName}</span>. Your {selectedTrader.category} appointment with <span className="font-semibold text-slate-900">{selectedTrader.name}</span> has been confirmed for <span className="font-semibold text-slate-900">{bookingDate}</span> at <span className="font-semibold text-slate-900">{bookingTime}</span>.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 space-y-2 text-left">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-emerald-600" /> What happens next?
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 leading-normal">
                    <li>The trader will review the coordinates and travel buffer.</li>
                    <li>You will receive a confirmation email with details.</li>
                    <li>Once work is finished, confirm completion in your portal to release the escrow.</li>
                  </ol>
                </div>

                <Button onClick={() => setSelectedTrader(null)} className="w-full h-11">
                  Done
                </Button>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
