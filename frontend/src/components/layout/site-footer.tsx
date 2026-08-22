import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="font-outfit text-xl font-bold tracking-tight text-slate-900">
                Trade<span className="text-orange-500">Slot</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              The modern booking platform for tradespeople and homeowners. Smart travel buffers, instant multi-channel intake, and automated Stripe Connect payouts.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Stripe Verified Escrow
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-outfit">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/how-it-works" className="hover:text-orange-600 transition-colors">How It Works</Link></li>
              <li><Link href="/find-traders" className="hover:text-orange-600 transition-colors">Find a Trader</Link></li>
              <li><Link href="/book" className="hover:text-orange-600 transition-colors">Book an Appointment</Link></li>
            </ul>
          </div>

          {/* For Traders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-outfit">For Tradespeople</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/for-traders" className="hover:text-orange-600 transition-colors">Trader Platform Features</Link></li>
              <li><Link href="/register" className="hover:text-orange-600 transition-colors">Join as a Trader</Link></li>
              <li><Link href="/login" className="hover:text-orange-600 transition-colors">Trader Portal Sign In</Link></li>
              <li><Link href="/dashboard" className="hover:text-orange-600 transition-colors">Trader Dashboard</Link></li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-outfit">Guarantee & Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every job is protected by our transparent flat fee billing. Traders receive direct payouts without hidden platform commissions.
            </p>
            <div className="pt-1 text-xs text-slate-400">
              Need help? Contact support at <strong className="text-slate-700">support@tradeslot.co.uk</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TradeSlot Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
