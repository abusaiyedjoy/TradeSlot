"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Plus,
  Save,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { traderService } from "@/services/trader.service";
import { MockWorkArea, MOCK_WORK_AREAS } from "@/lib/mock-data";

const PRESET_AREAS = [
  "Central London (Westminster / Soho / City)",
  "North London (Camden / Islington / Highbury)",
  "West London (Kensington / Chelsea / Fulham)",
  "East London (Hackney / Bethnal Green / Stratford)",
  "South London (Greenwich / Southwark / Clapham)",
  "Greater London / M25 Corridor",
];

export default function WorkAreaPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [areaLabel, setAreaLabel] = useState("");
  const [savedAreas, setSavedAreas] = useState<MockWorkArea[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadAreas() {
      const areas = await traderService.listWorkAreas();
      setSavedAreas(areas);
    }
    loadAreas();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaLabel.trim()) return;

    setLoading(true);
    setSuccessMsg(null);

    try {
      const newArea = await traderService.setWorkArea(date, areaLabel);
      setSavedAreas((prev) => {
        const filtered = prev.filter((a) => a.date !== date);
        return [...filtered, newArea].sort((a, b) => a.date.localeCompare(b.date));
      });
      setSuccessMsg(`Work area for ${date} successfully set to "${areaLabel}"!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
          Daily Work Area Setup
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Set your operational zone for specific days. Customers can only book slots on days where you have configured an active work area.
        </p>
      </div>

      {/* Scope Note Banner */}
      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-800 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-orange-950">MVP Architecture Note:</strong> This is a simple, one-off daily setting. Customers requesting slots on unconfigured dates are prompted to choose an active date. (Recurring weekly zone schedules are supported in future scope).
        </div>
      </div>

      {/* Form Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" /> Set Work Area for Date
        </h3>

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-700 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="workDate" className="text-xs font-semibold text-slate-700">
                Target Date
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="workDate"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-50 border-slate-200 text-slate-900 text-xs pl-9 focus-visible:ring-orange-500 rounded-xl"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="areaLabel" className="text-xs font-semibold text-slate-700">
                Area / Zone Label
              </Label>
              <div className="mt-1.5 relative">
                <Input
                  id="areaLabel"
                  type="text"
                  required
                  value={areaLabel}
                  onChange={(e) => setAreaLabel(e.target.value)}
                  placeholder="e.g. Central London (Westminster / Soho)"
                  className="bg-slate-50 border-slate-200 text-slate-900 text-xs pl-9 focus-visible:ring-orange-500 rounded-xl"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Quick Preset Badges */}
          <div>
            <span className="text-[11px] text-slate-500 block mb-2 font-medium">
              Or quick select from common zones:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_AREAS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setAreaLabel(preset)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700 hover:text-orange-700 hover:border-orange-200 hover:bg-orange-50 transition-all text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !areaLabel.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-sm shadow-orange-500/20 transition-all gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Daily Zone
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Saved Active Zones List */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center justify-between">
          <span>Configured Active Dates ({savedAreas.length})</span>
          <span className="text-xs text-slate-500 font-normal">Available for bookings</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {savedAreas.map((area) => (
            <div key={area.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{area.areaLabel}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {new Date(area.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                  Active
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setDate(area.date);
                    setAreaLabel(area.areaLabel);
                  }}
                  className="text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50 h-7 px-2"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
