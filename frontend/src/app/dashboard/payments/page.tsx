"use client"

import * as React from "react"
import { CreditCard, ShieldCheck, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function PaymentsOverviewPage() {
  const transactions = [
    {
      id: "tx_1",
      customer: "Jordan Mitchell",
      description: "Residential Rewiring Deposit",
      date: "Oct 12, 2023",
      amount: "$180.00",
      status: "Succeeded",
      method: "Visa ending in 4242",
    },
    {
      id: "tx_2",
      customer: "Tom Bradley",
      description: "Emergency Leak Repair Fee",
      date: "Sep 28, 2023",
      amount: "$240.00",
      status: "Succeeded",
      method: "Mastercard ending in 8831",
    },
    {
      id: "tx_3",
      customer: "Elena Rostova",
      description: "Truck Rental Reservation",
      date: "Aug 25, 2026",
      amount: "$360.00",
      status: "Escrow Held",
      method: "Visa ending in 1102",
    },
  ]

  return (
    <>
      <DashboardHeader title="Payments & Escrow" />

      <main className="p-6 md:p-8 space-y-6 max-w-7xl">
        {/* Title */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Payments &amp; Stripe Escrow
          </h2>
          <p className="text-sm text-slate-500">
            Real-time transaction history, Stripe Connect balance, and payout distributions.
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Available Payout Balance
            </span>
            <div className="my-2">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                $1,240.00
              </span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Ready for next bank transfer
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Held in Protected Escrow
            </span>
            <div className="my-2">
              <span className="font-display text-3xl font-extrabold text-slate-900">
                $360.00
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-emerald-600" /> Releases upon job completion
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Stripe Connect Status
            </span>
            <div className="my-2">
              <span className="font-display text-xl font-extrabold text-emerald-600">
                Active &amp; Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Account ID: <span className="font-mono">acct_1NZ0x9...</span>
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-slate-900">
              Recent Transactions
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Powered by Stripe
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Method</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {tx.description}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{tx.customer}</td>
                    <td className="py-4 px-6 text-slate-500">{tx.date}</td>
                    <td className="py-4 px-6 text-slate-500">{tx.method}</td>
                    <td className="py-4 px-6">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[10px]">
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900 tabular-nums">
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
