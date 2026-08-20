import * as React from "react";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={twMerge("divide-y divide-slate-100", className)}>
      {children}
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  name?: string; // native mutually exclusive accordion group name
  className?: string;
}

export function AccordionItem({
  title,
  children,
  name,
  className,
}: AccordionItemProps) {
  return (
    <details
      name={name}
      className={twMerge(
        "group py-4 [&_summary::-webkit-details-marker]:hidden border-b border-slate-100",
        className
      )}
    >
      <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-slate-900 list-none outline-none focus-visible:text-emerald-600 transition-colors select-none">
        <span>{title}</span>
        <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-400 group-open:rotate-180 group-open:text-emerald-600 group-open:bg-emerald-50 transition-all duration-300">
          <ChevronDown className="h-4 w-4 transition-transform duration-300" />
        </span>
      </summary>

      <div className="mt-3 text-sm text-slate-500 leading-relaxed transition-all duration-300 pl-1">
        {children}
      </div>
    </details>
  );
}
