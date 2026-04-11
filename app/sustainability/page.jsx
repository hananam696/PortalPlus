"use client";

import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { writeLeaderboardEntry } from "../../utils/leaderboard";
import { calculateEcoPoints, getCurrentEcoTier, calculateAchievements, ECO_TIERS } from "../../utils/gamification";

const LEVEL_CONFIG = [
  { id: 1, name: "Planet First",        icon: "🌍", completedBg: "bg-emerald-100", completedText: "text-emerald-700", completedBorder: "border-emerald-200" },
  { id: 2, name: "Digital Footprint",   icon: "👣", completedBg: "bg-blue-100",    completedText: "text-blue-700",    completedBorder: "border-blue-200"    },
  { id: 3, name: "Sustainable Systems", icon: "⚙️", completedBg: "bg-violet-100",  completedText: "text-violet-700",  completedBorder: "border-violet-200"  },
  { id: 4, name: "Green Engineer",      icon: "🔧", completedBg: "bg-orange-100",  completedText: "text-orange-700",  completedBorder: "border-orange-200"  },
  { id: 5, name: "Impact Maker",        icon: "🚀", completedBg: "bg-rose-100",    completedText: "text-rose-700",    completedBorder: "border-rose-200"    },
];

// ─────────────────────────────────────────────────────────────
// ECO CLASH OPT-IN
// ─────────────────────────────────────────────────────────────

function LeaderboardOptIn({ data }) {
  const [optedIn,     setOptedIn]     = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [saved,       setSaved]       = useState(false);
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const prefix     = storedUser?.id ? `u_${storedUser.id}_` : "";
    const opted      = localStorage.getItem(`${prefix}pp_leaderboard_optin`) === "true";
    const name       = localStorage.getItem(`${prefix}pp_display_name`) || "";
    setOptedIn(opted);
    setDisplayName(name);
  }, []);

  if (!mounted) return null;

  async function handleJoin() {
    if (!displayName.trim()) return;
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const prefix     = storedUser?.id ? `u_${storedUser.id}_` : "";

    let uid = localStorage.getItem(`${prefix}pp_uid`);
    if (!uid) {
      uid = "anon_" + Math.random().toString(36).slice(2) + Date.now();
      localStorage.setItem(`${prefix}pp_uid`, uid);
    }

    localStorage.setItem(`${prefix}pp_leaderboard_optin`, "true");
    localStorage.setItem(`${prefix}pp_display_name`, displayName.trim());
    setOptedIn(true);

    const ecoPoints       = calculateEcoPoints(data);
    const tier            = getCurrentEcoTier(ecoPoints);
    const levelsCompleted = Array.from({ length: 5 }, (_, i) =>
      data[`pp_l${i + 1}_passed`] === "true"
    ).filter(Boolean).length;
    const achievements = calculateAchievements(data);
    const badgeCount   = Object.values(achievements).filter(Boolean).length + levelsCompleted;

    await writeLeaderboardEntry({
      uid,
      displayName: displayName.trim(),
      ecoPoints,
      tierName: tier?.name || "Unaware",
      levelsCompleted,
      badgeCount,
    });
    setSaved(true);
  }

async function handleOptOut() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const prefix     = storedUser?.id ? `u_${storedUser.id}_` : "";
  const uid        = localStorage.getItem(`${prefix}pp_uid`);

  // Remove from MongoDB
  if (uid) {
    await fetch("/api/leaderboard", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });
  }

  localStorage.setItem(`${prefix}pp_leaderboard_optin`, "false");
  setOptedIn(false);
  setSaved(false);
}

  if (optedIn) {
    return (
      <div className="mb-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-green-700">
            {saved ? "You're on Eco Clash!" : `On Eco Clash as "${displayName}"`}
          </p>
          <p className="text-xs text-gray-500">Your rank updates when you complete levels</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/eco-clash" className="text-xs text-green-600 font-semibold hover:underline">
            View Rankings
          </Link>
          <button onClick={handleOptOut} className="text-xs text-gray-400 hover:text-gray-600 underline">
            Opt out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
      <p className="text-sm font-semibold text-gray-900 mb-1">Join Eco Clash</p>
      <p className="text-xs text-gray-500 mb-3">
        Appear on the public leaderboard. Choose a display name — your real name is never shown.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Display name e.g. GreenCoder99"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleJoin()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          maxLength={30}
        />
        <button
          onClick={handleJoin}
          disabled={!displayName.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:bg-gray-300"
        >
          Join
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN CONTENT
// ─────────────────────────────────────────────────────────────

function SustainabilityContent() {
  const [data,    setData]    = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const userPrefix = storedUser?.id ? `u_${storedUser.id}_` : "";
      const localData  = Object.keys(localStorage).reduce((acc, key) => {
        if (key.startsWith(`${userPrefix}pp_`)) {
          acc[key.replace(userPrefix, "")] = localStorage.getItem(key);
        }
        return acc;
      }, {});
      setData(localData);
    }
  }, []);

  if (!mounted) return null;

  const ecoPoints      = calculateEcoPoints(data);
  const currentTier    = getCurrentEcoTier(ecoPoints);
  const achievements   = calculateAchievements(data);
  const nextTier       = ECO_TIERS.find(t => t.minPoints > ecoPoints);
  const pointsToNext   = nextTier ? nextTier.minPoints - ecoPoints : 0;
  const currentTierObj = ECO_TIERS.find(t => ecoPoints >= t.minPoints && ecoPoints <= t.maxPoints);
  const progressPct    = nextTier && currentTierObj
    ? ((ecoPoints - currentTierObj.minPoints) / (nextTier.minPoints - currentTierObj.minPoints)) * 100
    : 100;

  const completedCount = Array.from({ length: 5 }, (_, i) =>
    data[`pp_l${i + 1}_passed`] === "true"
  ).filter(Boolean).length;
  const totalScore = Array.from({ length: 5 }, (_, i) =>
    parseInt(data[`pp_l${i + 1}_score`] || 0)
  ).reduce((a, b) => a + b, 0);
  const badgeCount = Object.values(achievements).filter(Boolean).length;

  return (
<div className="min-h-screen relative overflow-hidden" style={{background: "linear-gradient(160deg, #022c22 0%, #064e3b 35%, #065f46 65%, #0f766e 100%)"}}>
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-3xl" />
    <div className="absolute top-20 right-0 w-72 h-72 bg-teal-300 rounded-full opacity-10 blur-3xl" />
  </div>
<div className="pt-10 pb-6 text-center text-white px-4">
  <h1 className="text-4xl font-extrabold mb-2">Eco Dashboard</h1>
<p className="text-green-100 text-sm">Sustainability Learning Record</p>
      </div>

<div className="rounded-3xl px-6 py-8 max-w-2xl mx-auto mb-10" style={{ background: "#fafaf7" }}>
  <div className="rounded-2xl p-6 border mb-6 text-center" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
            <div className="text-5xl mb-2">{currentTier?.icon}</div>
          <h2 className="text-2xl font-bold text-gray-900">{currentTier?.name}</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {ecoPoints} <span className="text-sm font-normal text-gray-500">Eco Points</span>
          </p>
          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress to {nextTier.name}</span>
                <span>{pointsToNext} pts to go</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPct, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Levels Done</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">{totalScore}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Score</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">{badgeCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Badges</p>
          </div>
        </div>

        {/* LEVELS */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Levels</h3>
          <div className="space-y-2">
            {LEVEL_CONFIG.map((level) => {
              const passed = data[`pp_l${level.id}_passed`] === "true";
              const score  = parseInt(data[`pp_l${level.id}_score`] || 0);
              const total  = parseInt(data[`pp_l${level.id}_total`] || 10);
              const pct    = total > 0 ? Math.round((score / total) * 100) : 0;
              const date   = data[`pp_l${level.id}_date`] || "";

              return (
                <div
                  key={level.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    passed
                      ? `${level.completedBg} ${level.completedBorder}`
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{level.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${passed ? level.completedText : "text-gray-400"}`}>
                      {level.name}
                    </p>
                    {passed && date && (
                      <p className="text-xs text-gray-400">{date}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {passed ? (
                      <>
                        <p className={`text-sm font-bold ${level.completedText}`}>{pct}%</p>
                        <p className="text-xs text-gray-400">{score}/{total}</p>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BADGES */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Badges</h3>
<div className="grid grid-cols-3 gap-2">
              {[
              { key: "momentum",   icon: "🔥", name: "Momentum"    },
              { key: "sharp",      icon: "⚡", name: "Sharp Mind"  },
              { key: "perfect",    icon: "💎", name: "Perfect Run" },
              { key: "growth",     icon: "🔄", name: "Growth"      },
              { key: "impact",     icon: "🌍", name: "Impact Maker"},
            ].map((b) => (
              <div
                key={b.key}
                className={`rounded-xl p-3 text-center border ${
                  achievements[b.key]
                    ? "bg-amber-50 border-amber-200"
                    : "bg-gray-50 border-gray-100 opacity-40"
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-xs font-medium text-gray-700 leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ECO CLASH OPT-IN */}
        <LeaderboardOptIn data={data} />

        {/* CTA */}
        <Link
          href="/learn"
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition text-center"
        >
          {completedCount === 5 ? "Programme Complete" : "Continue Learning"}
        </Link>

      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <SustainabilityContent />
    </ProtectedRoute>
  );
}