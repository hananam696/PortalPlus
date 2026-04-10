"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { Leaf, Award, CheckCircle, Trophy, TrendingUp, Star, Lock, GitShare2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Eco Level Tiers
// ─────────────────────────────────────────────────────────────

const ECO_TIERS = [
  { name: "Seedling", icon: "🌱", minPoints: 0, maxPoints: 99 },
  { name: "Sapling", icon: "🌿", minPoints: 100, maxPoints: 299 },
  { name: "Forest", icon: "🌳", minPoints: 300, maxPoints: 599 },
  { name: "Canopy", icon: "🌲", minPoints: 600, maxPoints: 999 },
  { name: "Guardian", icon: "🌍", minPoints: 1000, maxPoints: Infinity },
];

const LEVEL_CONFIG = [
  { id: 1, name: "Planet First", icon: "🌍", color: "emerald", completedBg: "bg-emerald-100", completedText: "text-emerald-700", completedBorder: "border-emerald-200", cardBg: "bg-emerald-50", cardBorder: "border-emerald-200", cardText: "text-emerald-700" },
  { id: 2, name: "Digital Footprint", icon: "👣", color: "blue", completedBg: "bg-blue-100", completedText: "text-blue-700", completedBorder: "border-blue-200", cardBg: "bg-blue-50", cardBorder: "border-blue-200", cardText: "text-blue-700" },
  { id: 3, name: "Sustainable Systems", icon: "⚙️", color: "violet", completedBg: "bg-violet-100", completedText: "text-violet-700", completedBorder: "border-violet-200", cardBg: "bg-violet-50", cardBorder: "border-violet-200", cardText: "text-violet-700" },
  { id: 4, name: "Green Engineer", icon: "🔧", color: "orange", completedBg: "bg-orange-100", completedText: "text-orange-700", completedBorder: "border-orange-200", cardBg: "bg-orange-50", cardBorder: "border-orange-200", cardText: "text-orange-700" },
  { id: 5, name: "Impact Maker", icon: "🚀", color: "rose", completedBg: "bg-rose-100", completedText: "text-rose-700", completedBorder: "border-rose-200", cardBg: "bg-rose-50", cardBorder: "border-rose-200", cardText: "text-rose-700" },
];

const ACTION_PROMPTS = {
  1: "Name one technology you use daily and estimate how much e-waste it will become.",
  2: "Go to websitecarbon.com and test any website. What was the result in grams CO₂ per visit?",
  3: "Think of any app or system you use at university. Describe one architectural inefficiency you noticed.",
  4: "Estimate how many unnecessary database calls or API requests your last coding project made per page load.",
  5: "Write your green engineering commitment — one specific thing you will do in your next project.",
};

// ─────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────

function calculateEcoPoints(data) {
  let points = 0;

  for (let i = 1; i <= 5; i++) {
    const passed = data[`pp_l${i}_passed`];
    const score = parseInt(data[`pp_l${i}_score`] || 0);
    const pledge = data[`pp_l${i}_pledge`];

    if (passed) {
      points += 100; // Pass any level
      if (score >= 90) points += 50; // 90%+
      if (score === 100) points += 100; // Perfect
      if (pledge) points += 25; // Pledge submitted
    }
  }

  const allPassed = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`]).every(Boolean);
  if (allPassed) points += 200; // Bonus for completing all

  return points;
}

function getCurrentEcoTier(points) {
  return ECO_TIERS.find(t => points >= t.minPoints && points <= t.maxPoints);
}

function calculateAchievements(data) {
  const achievements = {};

  const completedCount = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`]).filter(Boolean).length;
  const pledgeCount = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_pledge`]).filter(Boolean).length;

  achievements.momentum = completedCount >= 3; // 🔥 Momentum
  achievements.sharp = Array.from({ length: 5 }, (_, i) => {
    const score = parseInt(data[`pp_l${i + 1}_score`] || 0);
    return score >= 90;
  }).some(Boolean); // ⚡ Sharp Mind
  achievements.perfect = Array.from({ length: 5 }, (_, i) => {
    const score = parseInt(data[`pp_l${i + 1}_score`] || 0);
    return score === 100;
  }).some(Boolean); // 💎 Perfect Run
  achievements.growth = Array.from({ length: 5 }, (_, i) => {
    const currentScore = parseInt(data[`pp_l${i + 1}_score`] || 0);
    const prevScores = JSON.parse(data.pp_prev_scores || "{}");
    return prevScores[i + 1] && currentScore > prevScores[i + 1];
  }).some(Boolean); // 🔄 Growth Mindset
  achievements.impact = completedCount === 5; // 🌍 Impact Maker
  achievements.reflective = pledgeCount >= 3; // 📝 Reflective Practitioner
  achievements.committed = pledgeCount === 5; // 🚀 Full Commitment
  achievements.researcher = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_action`]).some(Boolean); // 🔬 Field Researcher

  return achievements;
}

function getLeaderboardData() {
  if (typeof window === "undefined") return [];
  const optedIn = localStorage.getItem("pp_leaderboard_optin") === "true";
  if (!optedIn) return [];

  const displayName = localStorage.getItem("pp_display_name") || "Anonymous";
  const data = Object.keys(localStorage).reduce((acc, key) => {
    acc[key] = localStorage.getItem(key);
    return acc;
  }, {});

  const points = calculateEcoPoints(data);
  const tier = getCurrentEcoTier(points);
  const completedCount = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`]).filter(Boolean).length;
  const achievements = calculateAchievements(data);
  const badgeCount = Object.values(achievements).filter(Boolean).length;

  return [
    {
      displayName,
      points,
      tier: tier?.name || "Seedling",
      levelsCompleted: completedCount,
      badgesCount: badgeCount + completedCount,
      isCurrentUser: true,
    },
  ];
}

function SustainabilityContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({});
  const [badges, setBadges] = useState({});
  const [showBadgePopup, setShowBadgePopup] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const localData = Object.keys(localStorage).reduce((acc, key) => {
        if (key.startsWith("pp_")) {
          acc[key] = localStorage.getItem(key);
        }
        return acc;
      }, {});
      setData(localData);
      setBadges(calculateAchievements(localData));
    }
  }, []);

  if (!mounted) return null;

  const ecoPoints = calculateEcoPoints(data);
  const currentTier = getCurrentEcoTier(ecoPoints);
  const achievements = calculateAchievements(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-700">
      {/* HERO */}
      <div className="py-24 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Leaf className="w-10 h-10" />
          Sustainability Hub
        </h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Track your learning, earn eco points, and see your impact across the sustainability programme.
        </p>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-3xl px-6 py-10 max-w-6xl mx-auto">
        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <TabButton
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            label="My Journey"
            active={activeTab === "journey"}
            onClick={() => setActiveTab("journey")}
          />
          <TabButton
            label="Badges"
            active={activeTab === "badges"}
            onClick={() => setActiveTab("badges")}
          />
          <TabButton
            label="Leaderboard"
            active={activeTab === "leaderboard"}
            onClick={() => setActiveTab("leaderboard")}
          />
        </div>

        {/* TAB CONTENT */}
        {activeTab === "overview" && (
          <OverviewTab ecoPoints={ecoPoints} currentTier={currentTier} data={data} />
        )}
        {activeTab === "journey" && <MyJourneyTab data={data} />}
        {activeTab === "badges" && <BadgesTab achievements={achievements} data={data} />}
        {activeTab === "leaderboard" && <LeaderboardTab data={data} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB BUTTON
   ───────────────────────────────────────────────────────────── */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition ${
        active
          ? "bg-green-600 text-white shadow"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   OVERVIEW TAB
   ───────────────────────────────────────────────────────────── */

function OverviewTab({ ecoPoints, currentTier, data }) {
  const completedCount = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`]).filter(Boolean).length;
  const totalScore = Array.from({ length: 5 }, (_, i) => parseInt(data[`pp_l${i + 1}_score`] || 0)).reduce((a, b) => a + b, 0);
  const achievements = calculateAchievements(data);
  const badgeCount = Object.values(achievements).filter(Boolean).length;
  const pledgeCount = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_pledge`]).filter(Boolean).length;

  const nextTier = ECO_TIERS.find(t => t.minPoints > ecoPoints);
  const pointsToNext = nextTier ? nextTier.minPoints - ecoPoints : 0;
  const progressPercent = nextTier ? ((ecoPoints - ECO_TIERS.find(t => t.maxPoints >= ecoPoints).minPoints) / (nextTier.minPoints - ECO_TIERS.find(t => t.maxPoints >= ecoPoints).minPoints)) * 100 : 100;

  const allCompleted = completedCount === 5;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        {/* Eco Level & Points */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-sm border border-green-100 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-3">{currentTier?.icon}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentTier?.name}</h2>
            <div className="text-4xl font-bold text-green-600 mb-1">{ecoPoints}</div>
            <p className="text-sm text-gray-600">Eco Points</p>
          </div>

          {!allCompleted && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Progress to {nextTier?.name}</p>
                <p className="text-sm text-gray-600">{pointsToNext} points to go</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 transition-all duration-500"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Level Completion Indicators */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Levels Completed</h3>
          <div className="flex gap-3 flex-wrap">
            {LEVEL_CONFIG.map((level) => {
              const passed = data[`pp_l${level.id}_passed`];
              return (
                <div
                  key={level.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    passed
                      ? `${level.completedBg} ${level.completedText} border ${level.completedBorder}`
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  }`}
                >
                  <span>{level.icon}</span>
                  <span className="text-xs">{level.name}</span>
                  {passed && <CheckCircle size={14} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Levels Completed" value={completedCount} icon="📚" />
          <StatCard label="Total Score" value={totalScore} icon="⭐" />
          <StatCard label="Achievement Badges" value={badgeCount} icon="🏆" />
          <StatCard label="Pledges Submitted" value={pledgeCount} icon="📝" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/learn"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition text-center"
          >
            Continue Learning
          </a>
          {allCompleted && (
            <div className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl text-center">
              ✨ Impact Maker
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MY JOURNEY TAB
   ───────────────────────────────────────────────────────────── */

function MyJourneyTab({ data }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {LEVEL_CONFIG.map((level) => {
          const passed = data[`pp_l${level.id}_passed`];
          if (!passed) return null;

          const score = parseInt(data[`pp_l${level.id}_score`] || 0);
          const pct = Math.round((score / 10) * 100);
          const pledge = data[`pp_l${level.id}_pledge`] || "";
          const action = data[`pp_l${level.id}_action`] || "";
          const completedDate = data[`pp_l${level.id}_date`] || new Date().toLocaleDateString();

          return (
            <div key={level.id} className={`${level.cardBg} border ${level.cardBorder} rounded-2xl p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>{level.icon}</span> {level.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{completedDate}</p>
                </div>
                <span className={`${level.cardText} font-semibold`}>{score}/10 ({pct}%)</span>
              </div>

              {pledge && (
                <div className="mb-4 p-3 bg-white rounded-lg border-l-4 border-amber-400">
                  <p className="text-xs font-medium text-gray-600 mb-1">Your Pledge:</p>
                  <p className="text-sm text-gray-800">{pledge}</p>
                </div>
              )}

              {action && (
                <div className="mb-4 p-3 bg-white rounded-lg border-l-4 border-blue-400">
                  <p className="text-xs font-medium text-gray-600 mb-1">Self-Reported Action:</p>
                  <p className="text-sm text-gray-800">{action}</p>
                </div>
              )}

              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                ↻ Retake Level
              </button>
            </div>
          );
        })}

        {Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`]).filter(Boolean).length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <p className="text-gray-600">Start learning to see your journey here.</p>
            <a href="/learn" className="text-green-600 font-semibold mt-2 inline-block hover:underline">
              Go to Learning →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BADGES TAB
   ───────────────────────────────────────────────────────────── */

function BadgesTab({ achievements, data }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Section A: Learning Badges */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LEVEL_CONFIG.map((level) => {
            const passed = data[`pp_l${level.id}_passed`];
            const score = parseInt(data[`pp_l${level.id}_score`] || 0);
            const pledge = data[`pp_l${level.id}_pledge`];

            if (passed) {
              return (
                <div
                  key={level.id}
                  className={`${level.cardBg} border ${level.cardBorder} rounded-xl p-6 text-center relative shadow-sm hover:shadow-md transition`}
                >
                  {pledge && <div className="absolute -top-2 -right-2 text-xl">⭐</div>}
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{level.name}</h4>
                  <p className={`text-xs ${level.cardText} font-medium`}>Earned · {score}/10</p>
                  {pledge && <p className="text-xs text-amber-600 mt-2">+ Pledge</p>}
                </div>
              );
            } else {
              return (
                <div key={level.id} className="bg-gray-100 border border-gray-200 rounded-xl p-6 text-center opacity-50 shadow-sm">
                  <Lock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                  <h4 className="font-semibold text-gray-700 text-sm mb-1">{level.name}</h4>
                  <p className="text-xs text-gray-500">Complete Level {level.id}</p>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Section B: Achievement Badges */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge
            icon="🔥"
            name="Momentum"
            description="Completed 3+ levels"
            earned={achievements.momentum}
          />
          <AchievementBadge
            icon="⚡"
            name="Sharp Mind"
            description="Scored 90%+ on a level"
            earned={achievements.sharp}
          />
          <AchievementBadge
            icon="💎"
            name="Perfect Run"
            description="Scored 100% on a level"
            earned={achievements.perfect}
          />
          <AchievementBadge
            icon="🔄"
            name="Growth Mindset"
            description="Improved your score"
            earned={achievements.growth}
          />
          <AchievementBadge
            icon="🌍"
            name="Impact Maker"
            description="Completed all 5 levels"
            earned={achievements.impact}
          />
          <AchievementBadge
            icon="📝"
            name="Reflective Practitioner"
            description="3+ pledge submissions"
            earned={achievements.reflective}
          />
          <AchievementBadge
            icon="🚀"
            name="Full Commitment"
            description="All 5 pledges submitted"
            earned={achievements.committed}
          />
          <AchievementBadge
            icon="🔬"
            name="Field Researcher"
            description="Self-reported actions"
            earned={achievements.researcher}
          />
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ icon, name, description, earned }) {
  return (
    <div
      className={`rounded-xl p-6 text-center transition ${
        earned
          ? "bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 shadow-sm hover:shadow-md"
          : "bg-gray-100 border border-gray-200 opacity-50"
      }`}
    >
      <div className={`text-4xl mb-3 ${earned ? "" : "grayscale opacity-60"}`}>{icon}</div>
      <h4 className={`font-semibold text-sm mb-1 ${earned ? "text-gray-900" : "text-gray-600"}`}>{name}</h4>
      <p className={`text-xs ${earned ? "text-gray-600" : "text-gray-500"}`}>{description}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LEADERBOARD TAB
   ───────────────────────────────────────────────────────────── */

function LeaderboardTab({ data }) {
  const [optedIn, setOptedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [showOptInPrompt, setShowOptInPrompt] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOptIn = localStorage.getItem("pp_leaderboard_optin") === "true";
      const savedName = localStorage.getItem("pp_display_name") || "";
      setOptedIn(savedOptIn);
      setDisplayName(savedName);
      setShowOptInPrompt(!savedOptIn);
    }
  }, []);

  const handleOptIn = () => {
    if (displayName.trim()) {
      localStorage.setItem("pp_leaderboard_optin", "true");
      localStorage.setItem("pp_display_name", displayName);
      setOptedIn(true);
      setShowOptInPrompt(false);
    }
  };

  const handleOptOut = () => {
    localStorage.setItem("pp_leaderboard_optin", "false");
    setOptedIn(false);
    setShowOptInPrompt(true);
  };

  const leaderboardData = getLeaderboardData();

  if (showOptInPrompt && !optedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Join the Leaderboard</h3>
          <p className="text-gray-600 mb-6">
            Show your progress on the class leaderboard? Your display name only — no personal data is collected.
          </p>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter a display name (e.g., EcoWarrior, GreenCoder)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              maxLength="30"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowOptInPrompt(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Skip
            </button>
            <button
              onClick={handleOptIn}
              disabled={!displayName.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-300"
            >
              Join Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!optedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-gray-600 mb-4">You have opted out of the leaderboard.</p>
        <button
          onClick={handleOptOut}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Join Leaderboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleOptOut}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Opt out
        </button>
      </div>

      {leaderboardData.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-2xl">
          <p className="text-gray-600">Complete some levels to appear on the leaderboard.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboardData
            .sort((a, b) => b.points - a.points)
            .map((entry, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 flex items-center justify-between ${
                  entry.isCurrentUser ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-gray-600 w-8">#{index + 1}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{entry.displayName}</p>
                    <p className="text-xs text-gray-500">{entry.tier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{entry.points} pts</p>
                  <p className="text-xs text-gray-600">{entry.levelsCompleted}/5 levels · {entry.badgesCount} badges</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ✅ Wrap with ProtectedRoute
export default function Page() {
  return (
    <ProtectedRoute>
      <SustainabilityContent />
    </ProtectedRoute>
  );
}