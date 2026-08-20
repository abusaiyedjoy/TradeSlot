"use client"

import * as React from "react"
import { Bell, Search, ArrowLeft, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  title?: string
  showBack?: boolean
  showShare?: boolean
  showSearch?: boolean
}

export function DashboardHeader({
  title = "Dashboard",
  showBack = false,
  showShare = false,
  showSearch = true,
}: DashboardHeaderProps) {
  const router = useRouter()

  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h1 className="font-display text-lg font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        )}

        {showShare && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}

        {/* Notifications */}
        <button className="relative h-9 w-9 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
            alt="Alex Morgan"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
          />
        </div>
      </div>
    </header>
  )
}
