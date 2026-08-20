"use client"

import Link from "next/link"
import { MapPinIcon, StarIcon, ZapIcon, GaugeIcon, UsersIcon } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/lib/mock-data"

interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
}

const CATEGORY_COLORS: Record<string, string> = {
  Car: "text-blue-600",
  SUV: "text-violet-600",
  Truck: "text-orange-600",
  Van: "text-cyan-600",
  Luxury: "text-amber-600",
  Motorcycle: "text-red-600",
}

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group", className)}>
      {/* Vehicle Photo */}
      <div className="relative h-44 overflow-hidden bg-muted">
        {vehicle.photo_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.photo_path}
            alt={vehicle.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <GaugeIcon className="h-12 w-12 text-slate-400" />
          </div>
        )}
        {/* Availability Badge */}
        <div className="absolute right-3 top-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
              vehicle.available
                ? "bg-emerald-500 text-white"
                : "bg-slate-700/80 text-slate-200"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                vehicle.available ? "bg-white" : "bg-slate-400"
              )}
            />
            {vehicle.available ? "Available" : "Rented Out"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <CardContent className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-base leading-tight">{vehicle.name}</h3>
            <p className={cn("mt-0.5 text-sm font-medium", CATEGORY_COLORS[vehicle.category] ?? "text-muted-foreground")}>
              {vehicle.category}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5 rounded-md bg-amber-50 px-2 py-1">
            <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-700">4.9</span>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {vehicle.description}
        </p>

        {/* Quick Specs */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1">
            <ZapIcon className="h-3.5 w-3.5" />
            {vehicle.fuel_type}
          </span>
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            {vehicle.transmission}
          </span>
        </div>

        {/* Plate number */}
        <p className="mt-3 text-[11px] font-mono font-semibold text-muted-foreground/70 uppercase tracking-widest">
          {vehicle.plate_number}
        </p>
      </CardContent>

      {/* Footer: Rate + CTA */}
      <CardFooter className="border-t bg-transparent px-4 py-3 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold tabular-nums">${vehicle.daily_rate}</span>
          <span className="ml-1 text-sm text-muted-foreground">/day</span>
        </div>
        <Link href={`/dashboard/vehicles/${vehicle.id}`}>
          <Button size="sm" disabled={!vehicle.available} className="font-semibold">
            View &amp; Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
