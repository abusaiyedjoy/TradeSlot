import { cn } from "@/lib/utils"
import type { RentalStatus } from "@/lib/mock-data"

const STATUS_CONFIG: Record<RentalStatus, { label: string; className: string; dot: string }> = {
  booked: {
    label: "Booked",
    className: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
    dot: "bg-blue-500",
  },
  ongoing: {
    label: "Ongoing",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "Completed",
    className: "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    dot: "bg-slate-500",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
    dot: "bg-red-500",
  },
}

interface RentalStatusBadgeProps {
  status: RentalStatus
  className?: string
  showDot?: boolean
}

export function RentalStatusBadge({ status, className, showDot = true }: RentalStatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      )}
      {config.label}
    </span>
  )
}
