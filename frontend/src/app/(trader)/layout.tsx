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
  Bell,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/services/auth.service";
import { MOCK_TRADER } from "@/lib/mock-data";

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
  const [trader, setTrader] = useState(MOCK_TRADER);

  useEffect(() => {
    const stored = authService.getStoredTrader();
    if (stored) setTrader(stored);
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans antialiased text-slate-100">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white font-outfit">
                Trade<span className="text-orange-500">Slot</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trader Quick Profile */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {trader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{trader.name}</p>
                <p className="text-xs text-slate-400 truncate">{trader.businessName}</p>
              </div>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Stripe Connect</span>
              {trader.onboardingComplete ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                  <AlertTriangle className="w-3 h-3" /> Incomplete
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-orange-400" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.badgeText && (
                    <Badge variant="outline" className="text-[10px] bg-orange-500/10 text-orange-400 border-orange-500/20">
                      {item.badgeText}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800/80 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Customer Booking Page</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950">
        {/* Top Navbar */}
        <header className="h-16 px-4 md:px-8 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                Trader Portal
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">• Automated Scheduling & Payouts</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/work-area">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs rounded-lg shadow-sm shadow-orange-500/20 gap-1.5 hidden sm:flex">
                <MapPin className="w-3.5 h-3.5" /> Set Today&apos;s Work Area
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
