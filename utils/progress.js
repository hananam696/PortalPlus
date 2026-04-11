// utils/progress.js
// Single source of truth for all learn/dashboard/sage progress data.
// Every module imports from here — no more scattered localStorage calls.

const LEVEL_COUNT = 5;
const key = (levelNum, suffix) => `pp_l${levelNum}_${suffix}`;

// ─────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────

export function saveLevelResult({ levelNum, score, total, passed }) {
  if (typeof window === "undefined") return;
  const pct = Math.round((score / total) * 100);

  // Store score as percentage (0–100), not raw count
  localStorage.setItem(key(levelNum, "passed"), passed ? "true" : "false");
  localStorage.setItem(key(levelNum, "score"), pct.toString());
  localStorage.setItem(key(levelNum, "date"), new Date().toLocaleDateString());

  // Track previous best for Growth Mindset badge
  const prev = JSON.parse(localStorage.getItem("pp_prev_scores") || "{}");
  if (!prev[levelNum] || pct > parseInt(prev[levelNum])) {
    prev[levelNum] = pct;
    localStorage.setItem("pp_prev_scores", JSON.stringify(prev));
  }
}

export function savePledge({ levelNum, pledge, action }) {
  if (typeof window === "undefined") return;
  if (pledge) localStorage.setItem(key(levelNum, "pledge"), pledge);
  if (action) localStorage.setItem(key(levelNum, "action"), action);
}

export function saveLeaderboardOptIn({ displayName }) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pp_leaderboard_optin", "true");
  localStorage.setItem("pp_display_name", displayName);
}

// ─────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────

export function loadAllProgress() {
  if (typeof window === "undefined") return {};
  return Object.keys(localStorage).reduce((acc, k) => {
    if (k.startsWith("pp_")) acc[k] = localStorage.getItem(k);
    return acc;
  }, {});
}

export function getProgressSummary() {
  if (typeof window === "undefined") return null;

  const levels = [];
  for (let i = 1; i <= LEVEL_COUNT; i++) {
    const passed = localStorage.getItem(key(i, "passed")) === "true";
    // score is already stored as pct by saveLevelResult
    const score = parseInt(localStorage.getItem(key(i, "score")) || "0");
    const pledge = localStorage.getItem(key(i, "pledge")) || null;
    const date = localStorage.getItem(key(i, "date")) || null;
    levels.push({ levelNum: i, passed, score, pledge, date });
  }

  const completedCount = levels.filter((l) => l.passed).length;
  const ecoPoints = computeEcoPoints(levels);
  const tier = getEcoTier(ecoPoints);

  return { levels, completedCount, ecoPoints, tier };
}

// ─────────────────────────────────────────────────────────────
// ECO POINTS — one place, used by dashboard + sage
// ─────────────────────────────────────────────────────────────

const ECO_TIERS = [
  { name: "Seedling", icon: "🌱", minPoints: 0,    maxPoints: 99 },
  { name: "Sapling",  icon: "🌿", minPoints: 100,  maxPoints: 299 },
  { name: "Forest",   icon: "🌳", minPoints: 300,  maxPoints: 599 },
  { name: "Canopy",   icon: "🌲", minPoints: 600,  maxPoints: 999 },
  { name: "Guardian", icon: "🌍", minPoints: 1000, maxPoints: Infinity },
];

export function computeEcoPoints(levels) {
  let points = 0;
  levels.forEach(({ passed, score, pledge }) => {
    if (passed) {
      points += 100;
      if (score >= 90) points += 50;  // score is pct
      if (score === 100) points += 100;
      if (pledge) points += 25;
    }
  });
  if (levels.every((l) => l.passed)) points += 200;
  return points;
}

export function getEcoTier(points) {
  return ECO_TIERS.find((t) => points >= t.minPoints && points <= t.maxPoints) || ECO_TIERS[0];
}

// ─────────────────────────────────────────────────────────────
// SAGE CONTEXT — plain text injected into chatbot system prompt
// ─────────────────────────────────────────────────────────────

const LEVEL_NAMES = [
  "Planet First",
  "Digital Footprint",
  "Sustainable Systems",
  "Green Engineer",
  "Impact Maker",
];

export function buildSageProgressContext(summary) {
  if (!summary || summary.completedCount === 0) {
    return "The student has not started any levels yet. Encourage them to try Level 1: Planet First on the Learn page.";
  }

  const lines = summary.levels.map((l) => {
    if (!l.passed) {
      return `  - Level ${l.levelNum} (${LEVEL_NAMES[l.levelNum - 1]}): not yet completed`;
    }
    return `  - Level ${l.levelNum} (${LEVEL_NAMES[l.levelNum - 1]}): passed, scored ${l.score}%${l.pledge ? ", submitted a pledge" : ""}`;
  });

  const nextLevel = summary.levels.find((l) => !l.passed);
  const nextLine = nextLevel
    ? `Their next level is Level ${nextLevel.levelNum}: ${LEVEL_NAMES[nextLevel.levelNum - 1]}. If they ask about quizzes or learning, direct them to the Learn page for that level.`
    : "They have completed all 5 levels. Congratulate them and discuss their eco points.";

  return [
    "The student's current learning progress:",
    ...lines,
    `Total eco points: ${summary.ecoPoints} (Tier: ${summary.tier.name} ${summary.tier.icon}).`,
    nextLine,
  ].join("\n");
}