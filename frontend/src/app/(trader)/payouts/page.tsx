"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Download,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { paymentsService } from "@/services/payments.service";
import { traderService } from "@/services/trader.service";
import { MOCK_TRADER, MockPayoutSummary } from "@/lib/mock-data";

export default function PayoutsPage() {
  const [stripeStatus, setStripeStatus] = useState<{
    stripeAccountId: string | null;
    onboardingComplete: boolean;
  }>({
    stripeAccountId: MOCK_TRADER.stripeAccountId,
    onboardingComplete: MOCK_TRADER.onboardingComplete,
  });
  const [payouts, setPayouts] = useState<MockPayoutSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [onboardLoading, setOnboardLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [status, pList] = await Promise.all([
        traderService.getStripeStatus(),
        paymentsService.getPayoutSummary(),
      ]);
      setStripeStatus(status);
      setPayouts(pList);
    }
    loadData();
  }, []);

  const handleStartOnboarding = async () => {
    setOnboardLoading(true);
    try {
      const res = await paymentsService.startOnboarding();
      if (res.url) {
        window.open(res.url, "_blank");
      }
    } finally {
      setOnboardLoading(false);
    }
  };

  const totalNetCents = payouts.reduce((acc, curr) => acc + curr.netPayoutCents, 0);
  const totalFeesCents = payouts.reduce((acc, curr) => acc + curr.platformFeeCents, 0);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit tracking-tight">
          Stripe Connect & Payouts
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Automated direct payments via Stripe Express. You receive job amounts directly into your bank account.
        </p>
      </div>

      {/* Stripe Connect Account Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-outfit">Stripe Connect Account</span>
              {stripeStatus.onboardingComplete ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-semibold gap-1 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Express Account Active
                </Badge>
              ) : (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-semibold gap-1 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" /> Action Required
                </Badge>
              )}
            </div>

            <p className="text-xs text-slate-300 max-w-xl">
              Account ID: <code className="bg-slate-950 px-2 py-0.5 rounded text-orange-400 font-mono">{stripeStatus.stripeAccountId || "Not created"}</code>
            </p>
            <p className="text-xs text-slate-400">
              Payouts are transferred directly to your bank account with automatic platform application fee deduction.
            </p>
          </div>

          <div>
            <Button
              onClick={handleStartOnboarding}
              disabled={onboardLoading}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/20 transition-all gap-2"
            >
              {onboardLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" /> Manage in Stripe Dashboard
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400">Total Net Transferred</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400 font-outfit">
              £{(totalNetCents / 100).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">All-time</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400">Platform Fees Captured</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-orange-400 font-outfit">
              £{(totalFeesCents / 100).toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-500">£5.00 / booking</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400">Completed Payout Jobs</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-outfit">
              {payouts.reduce((acc, curr) => acc + curr.bookingCount, 0)}
            </span>
            <span className="text-xs text-emerald-400 font-medium">100% success</span>
          </div>
        </div>
      </div>

      {/* How It Works Explainer Box */}
      <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-blue-300">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> Stripe Connect Architecture (MVP Flow)
        </div>
        <p className="text-slate-300 leading-relaxed">
          When a customer confirms a booking (£55.00 total), Stripe automatically captures the £5.00 platform fee as an <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300">application_fee_amount</code>. The £50.00 job payment is routed directly to your connected bank account via Stripe Express transfer data with zero intermediary delays.
        </p>
      </div>

      {/* Payout Records Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-outfit">Monthly Payout Breakdown</h3>
          <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
            Direct Deposits
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Period</th>
                <th className="pb-3">Jobs Completed</th>
                <th className="pb-3">Gross Total</th>
                <th className="pb-3">Platform Fee</th>
                <th className="pb-3 text-right pr-2">Net Trader Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {payouts.map((row) => (
                <tr key={row.month} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pl-2 font-semibold text-white">{row.month}</td>
                  <td className="py-3.5 text-slate-300">{row.bookingCount} jobs</td>
                  <td className="py-3.5 text-slate-300">£{(row.grossRevenueCents / 100).toFixed(2)}</td>
                  <td className="py-3.5 text-orange-400">-£{(row.platformFeeCents / 100).toFixed(2)}</td>
                  <td className="py-3.5 text-right pr-2 font-bold text-emerald-400">
                    £{(row.netPayoutCents / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
