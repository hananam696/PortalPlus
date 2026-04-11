"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Leaf, BookOpen, MapPin, Package, Award, ChevronRight,
  Flame, Zap, Star, Trophy, TrendingUp, Clock, CheckCircle
} from "lucide-react";

// ── Reuse same tier/points logic as sustainability page ──
const ECO_TIERS = [
  { name: "Seedling",  icon: "🌱", minPoints: 0,    maxPoints: 99   },
  { name: "Sapling",  icon: "🌿", minPoints: 100,  maxPoints: 299  },
  { name: "Forest",   icon: "🌳", minPoints: 300,  maxPoints: 599  },
  { name: "Canopy",   icon: "🌲", minPoints: 600,  maxPoints: 999  },
  { name: "Guardian", icon: "🌍", minPoints: 1000, maxPoints: Infinity },
];

const LEVEL_NAMES = [
  "Planet First", "Digital Footprint", "Sustainable Systems",
  "Green Engineer", "Impact Maker"
];
const LEVEL_ICONS = ["🌍", "👣", "⚙️", "🔧", "🚀"];
const LEVEL_COLORS = [
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-orange-500 to-red-500",
  "from-rose-500 to-pink-500",
];

function calculateEcoPoints(data) {
  let points = 0;
  for (let i = 1; i <= 5; i++) {
    const passed = data[`pp_l${i}_passed`] === "true";
    const score  = parseInt(data[`pp_l${i}_score`] || 0);
    const pledge = data[`pp_l${i}_pledge`];
    if (passed) {
      points += 100;
      if (score >= 9) points += 50;
      if (score === 10) points += 100;
      if (pledge) points += 25;
    }
  }
  const allPassed = Array.from({ length: 5 }, (_, i) => data[`pp_l${i+1}_passed`] === "true").every(Boolean);
  if (allPassed) points += 200;
  return points;
}

function getCurrentTier(points) {
  return ECO_TIERS.find(t => points >= t.minPoints && points <= t.maxPoints) || ECO_TIERS[0];
}

// ── Activity feed builder ──
function buildActivity(data) {
  const items = [];
  for (let i = 1; i <= 5; i++) {
    if (data[`pp_l${i}_passed`] === "true") {
      const score = parseInt(data[`pp_l${i}_score`] || 0);
      const date  = data[`pp_l${i}_date`] || "";
      items.push({
        icon: LEVEL_ICONS[i-1],
        text: `Passed Level ${i}: ${LEVEL_NAMES[i-1]}`,
        sub: `Score ${score}/10${date ? " · " + date : ""}`,
        pts: 100 + (score >= 9 ? 50 : 0) + (score === 10 ? 100 : 0),
        color: LEVEL_COLORS[i-1],
      });
    }
    if (data[`pp_l${i}_pledge`]) {
      items.push({
        icon: "📝",
        text: `Submitted pledge for Level ${i}`,
        sub: data[`pp_l${i}_pledge`].slice(0, 60) + (data[`pp_l${i}_pledge`].length > 60 ? "…" : ""),
        pts: 25,
        color: "from-amber-400 to-yellow-400",
      });
    }
  }
  return items.reverse().slice(0, 5);
}

// ── Main dashboard content ──
function DashboardContent() {
  const [data,      setData]      = useState({});
  const [mounted,   setMounted]   = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const d = {};
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith("pp_")) d[key] = localStorage.getItem(key);
      }
      setData(d);
    }
  }, []);

  if (!mounted) return null;

  const ecoPoints     = calculateEcoPoints(data);
  const tier          = getCurrentTier(ecoPoints);
  const nextTier      = ECO_TIERS.find(t => t.minPoints > ecoPoints);
  const completedLevels = Array.from({ length: 5 }, (_, i) => data[`pp_l${i+1}_passed`] === "true");
  const completedCount  = completedLevels.filter(Boolean).length;
  const nextLevelIdx    = completedLevels.findIndex(p => !p);
  const progressPct     = nextTier
    ? Math.round(((ecoPoints - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100)
    : 100;
  const activity = buildActivity(data);
  const userName = data["pp_display_name"] || null;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f1a12 0%, #0d1f1a 50%, #111827 100%)" }}>
      
      {/* ── TOP HEADER ── */}
      <div className="px-6 pt-10 pb-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400/70 mb-1">
              UDST · PortalPlus
            </p>
            <h1 className="text-3xl font-bold text-white leading-tight">
              {userName ? `Hey, ${userName} 👋` : "Dashboard"}
            </h1>
            <p className="text-sm text-gray-400 mt-1">Your campus life, all in one place</p>
          </div>
          <Link href="/sustainability">
            <div className="flex flex-col items-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3 hover:bg-emerald-500/20 transition cursor-pointer">
              <span className="text-2xl">{tier.icon}</span>
              <span className="text-xs font-bold text-emerald-400 mt-1">{ecoPoints} pts</span>
              <span className="text-[10px] text-emerald-500/60">{tier.name}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="px-6 max-w-4xl mx-auto space-y-5 pb-16">

        {/* ── ECO PROGRESS CARD ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #064e3b, #065f46)" }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">Eco Progress</span>
              </div>
              <Link href="/learn">
                <span className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition">
                  {completedCount < 5 ? "Continue learning" : "Review levels"}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {/* Tier + Points */}
            <div className="flex items-end gap-4 mb-5">
              <div>
                <div className="text-5xl font-black text-white tabular-nums">{ecoPoints}</div>
                <div className="text-sm text-emerald-300/70 mt-0.5">Eco Points</div>
              </div>
              <div className="mb-1">
                <div className="text-lg font-bold text-emerald-200">{tier.icon} {tier.name}</div>
                {nextTier && (
                  <div className="text-xs text-emerald-400/60">{nextTier.minPoints - ecoPoints} pts to {nextTier.name}</div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {nextTier && (
              <div className="mb-5">
                <div className="h-2 bg-emerald-900/60 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-emerald-500/50">{tier.name}</span>
                  <span className="text-[10px] text-emerald-500/50">{nextTier.name}</span>
                </div>
              </div>
            )}

            {/* Level dots */}
            <div className="flex gap-2">
              {LEVEL_NAMES.map((name, i) => (
                <div key={i} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full mb-1.5 ${completedLevels[i] ? "bg-emerald-400" : i === nextLevelIdx ? "bg-emerald-700 animate-pulse" : "bg-emerald-900/40"}`}
                  />
                  <div className="text-[9px] text-emerald-500/50 truncate hidden sm:block">{name}</div>
                </div>
              ))}
            </div>

            {/* CTA if levels remaining */}
            {completedCount < 5 && nextLevelIdx >= 0 && (
              <Link href="/learn">
                <div className="mt-4 flex items-center justify-between bg-emerald-900/40 border border-emerald-700/30 rounded-xl px-4 py-3 hover:bg-emerald-900/60 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{LEVEL_ICONS[nextLevelIdx]}</span>
                    <div>
                      <div className="text-xs text-emerald-300/60 uppercase tracking-wide">Up next</div>
                      <div className="text-sm font-semibold text-white">Level {nextLevelIdx + 1}: {LEVEL_NAMES[nextLevelIdx]}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </div>
              </Link>
            )}

            {completedCount === 5 && (
              <div className="mt-4 flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div className="text-sm font-semibold text-amber-300">🎉 Impact Maker — All levels complete!</div>
              </div>
            )}
          </div>
        </div>

        {/* ── QUICK ACCESS GRID ── */}
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Campus Tools</h2>
          <div className="grid grid-cols-3 gap-3">
            
            <Link href="/rental">
              <div className="rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Package className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Rental Hub</div>
                  <div className="text-[10px] text-indigo-300/60 mt-0.5">Books & gear</div>
                </div>
              </div>
            </Link>

            <Link href="/certificates">
              <div className="rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Certificates</div>
                  <div className="text-[10px] text-sky-300/60 mt-0.5">Your achievements</div>
                </div>
              </div>
            </Link>

            <Link href="/campus-map">
              <div className="rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a2e1a, #14451e)" }}>
                <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Campus Map</div>
                  <div className="text-[10px] text-green-300/60 mt-0.5">Find your way</div>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl p-4 text-center" style={{ background: "#111827", border: "1px solid #1f2937" }}>
            <div className="text-2xl font-black text-white">{completedCount}/5</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">Levels done</div>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: "#111827", border: "1px solid #1f2937" }}>
            <div className="text-2xl font-black text-emerald-400">{ecoPoints}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">Eco points</div>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: "#111827", border: "1px solid #1f2937" }}>
            <div className="text-2xl font-black text-amber-400">
              {Array.from({ length: 5 }, (_, i) => data[`pp_l${i+1}_pledge`]).filter(Boolean).length}
            </div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">Pledges</div>
          </div>
        </div>

        {/* ── ACTIVITY FEED ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500">Recent Activity</h2>
            <Link href="/sustainability">
              <span className="text-xs text-emerald-500 hover:text-emerald-400 transition">View all →</span>
            </Link>
          </div>

          {activity.length === 0 ? (
            <div className="rounded-2xl p-6 text-center" style={{ background: "#111827", border: "1px solid #1f2937" }}>
              <div className="text-3xl mb-2">🌱</div>
              <p className="text-sm text-gray-400">No activity yet.</p>
              <Link href="/learn">
                <span className="text-xs text-emerald-500 hover:text-emerald-400 mt-2 inline-block transition">
                  Start Level 1 to earn your first points →
                </span>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl px-4 py-3"
                  style={{ background: "#111827", border: "1px solid #1f2937" }}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-sm flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{item.text}</div>
                    <div className="text-xs text-gray-500 truncate">{item.sub}</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 flex-shrink-0">+{item.pts}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── LEADERBOARD TEASER ── */}
        <Link href="/sustainability">
          <div className="rounded-2xl p-5 flex items-center gap-4 hover:opacity-90 transition cursor-pointer"
            style={{ background: "linear-gradient(135deg, #1c1917, #292524)" }}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">Leaderboard</div>
              <div className="text-xs text-gray-400 mt-0.5">See how you rank against other students</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </Link>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
