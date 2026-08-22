"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wrench, Mail, Lock, User, Building, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.register({ name, email, password, businessName });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your details.");
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
          Join TradeSlot as a Trader
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Automate your multi-channel scheduling & receive direct Stripe payouts
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
              <Label htmlFor="name" className="text-slate-700 text-xs font-semibold">
                Full Name
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Carter"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor="businessName" className="text-slate-700 text-xs font-semibold">
                Business / Trading Name
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="businessName"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Carter Plumbing & Heating Ltd"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

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
                  placeholder="alex@carter-plumbing.co.uk"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 text-xs font-semibold">
                Password
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 text-xs h-10 rounded-xl focus-visible:ring-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-11 rounded-xl shadow-md shadow-orange-500/25 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Trader Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already registered?{" "}
              <Link href="/login" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
