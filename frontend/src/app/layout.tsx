import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeSlot - Book Trusted Local Traders In Minutes",
  description: "Book professional plumbers, electricians, carpenters, painters, and locksmiths securely online. Vetted experts, instant availability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, outfit.variable, "font-sans")}>
      <body className="font-sans antialiased text-slate-950 bg-slate-50">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}