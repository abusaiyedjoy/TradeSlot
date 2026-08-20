"use client"

import * as React from "react"
import { User, Mail, Phone, MapPin, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MOCK_STAFF } from "@/lib/mock-data"

export default function ProfilePage() {
  const [name, setName] = React.useState(MOCK_STAFF.name)
  const [email, setEmail] = React.useState(MOCK_STAFF.email)
  const [phone, setPhone] = React.useState("+1 (555) 234-5678")
  const [address, setAddress] = React.useState("10 Downing St, London, UK")
  const [saved, setSaved] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <DashboardHeader title="Profile Settings" showSearch={false} />

      <main className="p-6 md:p-8 space-y-6 max-w-4xl">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account Profile
          </h2>
          <p className="text-sm text-slate-500">
            Manage your personal details, contact preferences, and security settings.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
              alt="Alex Morgan"
              className="h-16 w-16 rounded-full object-cover ring-4 ring-slate-100"
            />
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">{name}</h3>
              <p className="text-xs text-slate-500">{email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                <ShieldCheck className="h-3 w-3" /> Verified Staff Member
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Location / Branch</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button type="submit" className="bg-[#0b1329] hover:bg-slate-800 text-white font-semibold px-6 rounded-xl">
                Save Changes
              </Button>
              {saved && (
                <span className="text-xs font-bold text-emerald-600 animate-fade-in">
                  ✓ Profile updated successfully
                </span>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
