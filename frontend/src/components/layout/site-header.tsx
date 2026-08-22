"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Find a Trader", href: "/find-traders" },
  { label: "For Traders", href: "/for-traders" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="font-outfit text-xl font-bold tracking-tight text-slate-900">
            Trade<span className="text-orange-500">Slot</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-orange-600 font-semibold border-b-2 border-orange-500"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-semibold text-xs h-9 px-3.5 rounded-xl">
              Trader Sign In
            </Button>
          </Link>
          <Link href="/book">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs h-9 px-4 rounded-xl shadow-sm shadow-orange-500/20 gap-1.5">
              Book a Slot <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-fade-in">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center text-xs font-semibold h-10 border-slate-200">
                Trader Sign In
              </Button>
            </Link>
            <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center text-xs font-semibold h-10 bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                Book a Slot
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
