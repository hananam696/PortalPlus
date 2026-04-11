"use client";

import { useState, useEffect } from "react";
import { fetchLeaderboard } from "../../utils/leaderboard";
import { ECO_TIERS } from "../../utils/gamification";
import Link from "next/link";
import { Zap, Trophy, RefreshCw } from "lucide-react";

export default function EcoClashPage() {
  const [entries,     setEntries]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [currentUid,  setCurrentUid]  = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [refreshing,  setRefreshing]  = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const prefix     = storedUser?.id ? `u_${storedUser.id}_` : "";
    const uid        = localStorage.getItem(`${prefix}pp_uid`) || "";
    setCurrentUid(uid);
    load();

    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    setRefreshing(true);
    const rows = await fetchLeaderboard(50);
    setEntries(rows);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
    setRefreshing(false);
  }

  const medals    = ["🥇", "🥈", "🥉"];
  const getTierIcon = (name) => ECO_TIERS.find(t => t.name === name)?.icon || "🌑";

  const totalPoints = entries.reduce((s, e) => s + (e.ecoPoints || 0), 0);
  const totalLevels = entries.reduce((s, e) => s + (e.levelsCompleted || 0), 0);

  return (
<div className="min-h-screen relative overflow-hidden" style={{background: "linear-gradient(160deg, #022c22 0%, #064e3b 35%, #065f46 65%, #0f766e 100%)"}}>
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-3xl" />
    <div className="absolute top-20 right-0 w-72 h-72 bg-teal-300 rounded-full opacity-10 blur-3xl" />
    <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-green-300 rounded-full opacity-10 blur-3xl" />
  </div>
      {/* ── HERO ── */}
      <div className="pt-14 pb-8 text-center text-white px-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Zap className="w-9 h-9 text-yellow-300 fill-yellow-300" />
          <h1 className="text-5xl font-black tracking-tight">Eco Clash</h1>
          <Zap className="w-9 h-9 text-yellow-300 fill-yellow-300" />
        </div>
        <p className="text-green-100 text-base mb-1">Who's leading the charge?</p>
        <p className="text-green-300 text-xs mb-8">
          Live rankings · UDST Sustainability in IT
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-10">
          {[
            { val: entries.length, label: "Students" },
            { val: totalLevels,    label: "Levels Done" },
            { val: totalPoints,    label: "Total Pts" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-black text-white">{val}</p>
              <p className="text-xs text-green-300 mt-1 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          <span className="text-xs text-green-300">
            {lastUpdated ? `Updated ${lastUpdated}` : "Loading..."}
          </span>
          <button
            onClick={load}
            disabled={refreshing}
            className="ml-2 text-green-300 hover:text-white transition"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── BOARD ── */}
<div className="rounded-3xl px-4 sm:px-8 py-10 max-w-4xl mx-auto mb-10" style={{ background: "#fafaf7" }}>        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
            <p className="text-gray-400 text-sm">Loading rankings...</p>
          </div>

        ) : entries.length === 0 ? (
          <div className="text-center py-28">
            <Trophy className="w-14 h-14 mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500 font-semibold text-lg">No one ranked yet.</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Complete a level to claim your spot.</p>
            <Link href="/learn" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition text-sm">
              Start Learning
            </Link>
          </div>

        ) : (
          <>
            {/* ── TOP 3 PODIUM ── */}
{entries.length >= 3 && (
  <div className="flex items-end justify-center gap-3 mb-10 px-2">

    {/* 2nd — Silver */}
    <div className="flex-1 text-center">
      <div className="rounded-2xl pt-5 pb-5 px-3 shadow-sm border-2" style={{ background: "#f8f8f8", borderColor: "#c0c0c0" }}>
        <p className="text-3xl mb-2">🥈</p>
        <p className="font-bold text-gray-800 text-sm truncate">{entries[1]?.displayName}</p>
        <p className="text-xs text-gray-500 mb-2">{entries[1]?.tierName}</p>
        <p className="font-black text-xl text-gray-700">{entries[1]?.ecoPoints} <span className="text-xs font-normal">pts</span></p>
        <p className="text-xs text-gray-400 mt-1">{entries[1]?.levelsCompleted}/5 levels</p>
      </div>
    </div>

    {/* 1st — Gold */}
    <div className="flex-1 text-center -mt-5">
      <div className="rounded-2xl pt-6 pb-5 px-3 shadow-lg border-2" style={{ background: "#fffbeb", borderColor: "#f59e0b" }}>
        <p className="text-4xl mb-2">🥇</p>
        <p className="font-black text-gray-900 text-base truncate">{entries[0]?.displayName}</p>
        <p className="text-xs mb-2" style={{ color: "#d97706" }}>{entries[0]?.tierName}</p>
        <p className="font-black text-2xl" style={{ color: "#d97706" }}>{entries[0]?.ecoPoints} <span className="text-xs font-normal">pts</span></p>
        <p className="text-xs mt-1" style={{ color: "#d97706" }}>{entries[0]?.levelsCompleted}/5 levels</p>
      </div>
    </div>

    {/* 3rd — Bronze */}
    <div className="flex-1 text-center">
      <div className="rounded-2xl pt-5 pb-5 px-3 shadow-sm border-2" style={{ background: "#fdf4ec", borderColor: "#cd7f32" }}>
        <p className="text-3xl mb-2">🥉</p>
        <p className="font-bold text-gray-800 text-sm truncate">{entries[2]?.displayName}</p>
        <p className="text-xs text-gray-500 mb-2">{entries[2]?.tierName}</p>
        <p className="font-black text-xl" style={{ color: "#cd7f32" }}>{entries[2]?.ecoPoints} <span className="text-xs font-normal">pts</span></p>
        <p className="text-xs text-gray-400 mt-1">{entries[2]?.levelsCompleted}/5 levels</p>
      </div>
    </div>

  </div>
)}
            {/* ── DIVIDER ── */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-100" />
              <p className="text-xs text-gray-400 uppercase tracking-widest">Full Rankings</p>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* ── FULL LIST ── */}
            <div className="space-y-2">
              {entries.map((entry, index) => {
                const isMe = entry.uid === currentUid;
                return (
                  <div
                    key={entry.uid || index}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                      isMe
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 border-2 shadow-sm"
                        : "bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-8 text-center flex-shrink-0">
                      {index < 3
                        ? <span className="text-lg">{medals[index]}</span>
                        : <span className="text-sm font-bold text-gray-300">#{index + 1}</span>}
                    </div>

                    {/* Tier icon */}
                    <div className="text-xl flex-shrink-0">{getTierIcon(entry.tierName)}</div>

                    {/* Name + tier */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {entry.displayName}
                        {isMe && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                            you
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{entry.tierName}</p>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-gray-900 text-sm">{entry.ecoPoints} pts</p>
                      <p className="text-xs text-gray-400">{entry.levelsCompleted}/5 levels</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── CTA ── */}
            {!currentUid && (
              <div className="mt-10 text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <p className="text-gray-800 font-bold text-lg mb-1">Want to appear here?</p>
                <p className="text-gray-500 text-sm mb-6">
                  Complete sustainability levels to earn Eco Points and claim your rank.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/login" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition text-sm shadow-sm">
                    Sign In
                  </Link>
                  <Link href="/signup" className="border-2 border-green-600 text-green-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition text-sm">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}