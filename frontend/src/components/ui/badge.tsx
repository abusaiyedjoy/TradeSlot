import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-slate-100 text-slate-800",
        variant === "success" && "border-transparent bg-emerald-50 text-emerald-700 border-emerald-200/50",
        variant === "warning" && "border-transparent bg-amber-50 text-amber-700 border-amber-200/50",
        variant === "danger" && "border-transparent bg-red-50 text-red-700 border-red-200/50",
        variant === "secondary" && "border-transparent bg-slate-900 text-slate-50",
        className
      )}
      {...props}
    />
  );
}
