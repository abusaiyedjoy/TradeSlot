"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  MessageSquare,
  CreditCard,
  User,
  HelpCircle,
  PlusSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Find a Trader",
    href: "/dashboard/find-trader",
    icon: Search,
  },
  {
    title: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarCheck,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    badge: true,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 bg-[#0b1329] text-slate-300 flex flex-col justify-between min-h-screen border-r border-slate-800/60 select-none">
      {/* Brand Logo Header */}
      <div>
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/40">
          <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <PlusSquare className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <span className="font-display font-bold text-lg text-white tracking-tight">
              TradeSlot
            </span>
            <span className="text-emerald-400 font-semibold text-sm ml-0.5">(R)</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-slate-800/90 text-white shadow-sm border border-slate-700/40"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Support */}
      <div className="p-4 border-t border-slate-800/40">
        <Link
          href="#help"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
        >
          <HelpCircle className="h-4 w-4 text-slate-400" />
          <span>Help</span>
        </Link>
      </div>
    </aside>
  )
}
