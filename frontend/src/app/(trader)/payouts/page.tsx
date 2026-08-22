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
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
          Stripe Connect & Payouts
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Automated direct payments via Stripe Express. You receive job amounts directly into your bank account.
        </p>
      </div>

      {/* Stripe Connect Account Status Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 font-outfit">Stripe Connect Account</span>
              {stripeStatus.onboardingComplete ? (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold gap-1 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Express Account Active
                </Badge>
              ) : (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-bold gap-1 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Action Required
                </Badge>
              )}
            </div>

            <p className="text-xs text-slate-600">
              Account ID: <code className="bg-slate-100 px-2 py-0.5 rounded text-orange-600 font-mono text-xs">{stripeStatus.stripeAccountId || "Not created"}</code>
            </p>
            <p className="text-xs text-slate-500">
              Payouts are transferred directly to your bank account with automatic flat £5.00 platform fee deduction.
            </p>
          </div>

          <div>
            <Button
              onClick={handleStartOnboarding}
              disabled={onboardLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-sm shadow-orange-500/20 transition-all gap-2"
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
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift">
          <span className="text-xs font-semibold text-slate-500">Total Net Transferred</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600 font-outfit">
              £{(totalNetCents / 100).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">All-time</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift">
          <span className="text-xs font-semibold text-slate-500">Platform Fees Captured</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-orange-600 font-outfit">
              £{(totalFeesCents / 100).toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">£5.00 / booking</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-lift">
          <span className="text-xs font-semibold text-slate-500">Completed Payout Jobs</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 font-outfit">
              {payouts.reduce((acc, curr) => acc + curr.bookingCount, 0)}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">100% success</span>
          </div>
        </div>
      </div>

      {/* How It Works Architecture Box */}
      <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-blue-800">
          <ShieldCheck className="w-4 h-4 text-blue-600" /> Stripe Connect Architecture (Direct Payout Flow)
        </div>
        <p className="text-slate-600 leading-relaxed text-xs">
          When a customer confirms a booking (£55.00 total), Stripe automatically captures the £5.00 platform fee as an <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-700 font-mono">application_fee_amount</code>. The £50.00 job payment is routed directly to your connected bank account via Stripe Express transfer data with zero intermediary delays.
        </p>
      </div>

      {/* Payout Records Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-outfit">Monthly Payout Breakdown</h3>
          <Badge variant="outline" className="border-slate-200 text-slate-600 text-xs font-semibold">
            Direct Deposits
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Period</th>
                <th className="pb-3">Jobs Completed</th>
                <th className="pb-3">Gross Total</th>
                <th className="pb-3">Platform Fee</th>
                <th className="pb-3 text-right pr-2">Net Trader Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {payouts.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-slate-900 text-xs font-outfit">{row.month}</td>
                  <td className="py-3.5 text-slate-600 text-xs">{row.bookingCount} jobs</td>
                  <td className="py-3.5 text-slate-600 text-xs">£{(row.grossRevenueCents / 100).toFixed(2)}</td>
                  <td className="py-3.5 text-orange-600 text-xs font-medium">-£{(row.platformFeeCents / 100).toFixed(2)}</td>
                  <td className="py-3.5 text-right pr-2 font-bold text-emerald-600 text-xs">
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
