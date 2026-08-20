import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  subValue?: string
  trend?: number   // positive = up, negative = down
  trendLabel?: string
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

export function StatsCard({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = "text-muted-foreground",
  className,
}: StatsCardProps) {
  const isPositive = trend !== undefined && trend >= 0
  const hasTraend = trend !== undefined

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon && (
            <div className={cn("rounded-lg bg-muted p-1.5", iconColor)}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold tracking-tight tabular-nums">
            {value}
          </span>
          {subValue && (
            <span className="mb-0.5 text-base text-muted-foreground">{subValue}</span>
          )}
        </div>
        {hasTraend && (
          <div className="mt-2 flex items-center gap-1 text-xs font-medium">
            {isPositive ? (
              <TrendingUpIcon className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDownIcon className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={isPositive ? "text-emerald-600" : "text-red-500"}>
              {isPositive ? "+" : ""}{trend}%
            </span>
            {trendLabel && (
              <span className="text-muted-foreground font-normal">{trendLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
