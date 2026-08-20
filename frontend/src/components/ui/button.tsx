import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
          variant === "primary" && "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/10",
          variant === "secondary" && "bg-slate-900 text-white hover:bg-slate-800",
          variant === "outline" && "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
          variant === "ghost" && "hover:bg-slate-100 text-slate-600",
          variant === "link" && "text-emerald-600 underline-offset-4 hover:underline p-0",
          size === "sm" && "h-9 px-3 text-sm",
          size === "md" && "h-11 px-5 text-base",
          size === "lg" && "h-13 px-7 text-lg rounded-2xl",
          size === "icon" && "h-10 w-10 p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
