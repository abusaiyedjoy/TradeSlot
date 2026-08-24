"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Wrench,
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  CreditCard,
  LogOut,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/services/auth.service";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText?: string;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings & Intake",
    href: "/bookings",
    icon: CalendarCheck,
  },
  {
    title: "Daily Work Area",
    href: "/work-area",
    icon: MapPin,
  },
  {
    title: "Stripe & Payouts",
    href: "/payouts",
    icon: CreditCard,
  },
];

export default function TraderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trader, setTrader] = useState({
    name: "Alex Carter",
    businessName: "Carter Plumbing & Heating Ltd",
    stripeAccountId: null as string | null,
    onboardingComplete: false,
  });

  useEffect(() => {
    const stored = authService.getStoredTrader();
    if (stored) {
      setTrader({
        name: stored.name || "Alex Carter",
        businessName: stored.businessName || "Carter Plumbing & Heating Ltd",
        stripeAccountId: stored.stripeAccountId || null,
        onboardingComplete: !!stored.stripeAccountId,
      });
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 font-outfit">
                Trade<span className="text-orange-500">Slot</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trader Profile Card */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center font-outfit shadow-sm">
                {trader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate font-outfit">{trader.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{trader.businessName}</p>
              </div>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Stripe Status:</span>
              {trader.onboardingComplete ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                  <AlertTriangle className="w-3 h-3 text-amber-600" /> Pending
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-orange-600" : "text-slate-400"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.badgeText && (
                    <Badge variant="outline" className="text-[10px] bg-orange-100 text-orange-700 border-orange-200">
                      {item.badgeText}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Customer Booking Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50">
        {/* Top Navbar */}
        <header className="h-16 px-4 md:px-8 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                Trader Management Portal
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Automated Scheduling & Escrow Payouts</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/work-area">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-sm shadow-orange-500/20 gap-1.5 hidden sm:flex">
                <MapPin className="w-3.5 h-3.5" /> Set Daily Zone
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
