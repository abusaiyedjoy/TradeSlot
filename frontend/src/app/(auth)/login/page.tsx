"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wrench, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@carter-plumbing.co.uk");
  const [password, setPassword] = useState("Password123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-orange-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center justify-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-outfit">
            Trade<span className="text-orange-500">Slot</span>
          </span>
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">
          Trader Portal Sign In
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage your schedule, daily work zones, and Stripe payouts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white border border-slate-200 py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-slate-700 text-xs font-semibold">
                Email Address
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 text-xs font-semibold">
                  Password
                </Label>
                <a href="#" className="text-[11px] text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="mt-1.5 relative">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-orange-500/25 transition-all mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don&apos;t have a trader account?{" "}
              <Link href="/register" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
                Register your business
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Helper Callout */}
        <div className="mt-6 p-3.5 rounded-xl bg-orange-50/80 border border-orange-200 text-xs text-orange-800 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Demo Mode Active:</strong> Pre-filled with active trader mock credentials. Click <strong>Sign In</strong> to explore the trader portal.
          </span>
        </div>
      </div>
    </div>
  );
}
