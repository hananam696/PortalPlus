// utils/gamification.js

export const ECO_TIERS = [
  { name: "Unaware",        icon: "🌑", minPoints: 0,    maxPoints: 99   },
  { name: "Aware",          icon: "💡", minPoints: 100,  maxPoints: 299  },
  { name: "Practitioner",   icon: "⚡", minPoints: 300,  maxPoints: 599  },
  { name: "Green Engineer", icon: "🔬", minPoints: 600,  maxPoints: 999  },
  { name: "Systems Changer",icon: "🌍", minPoints: 1000, maxPoints: Infinity },
];

export function calculateEcoPoints(data) {
  let points = 0;
  for (let i = 1; i <= 5; i++) {
    const passed = data[`pp_l${i}_passed`] === "true";
    const score  = parseInt(data[`pp_l${i}_score`]  || "0", 10);
    const total  = parseInt(data[`pp_l${i}_total`]  || "10", 10);
    if (passed) {
      points += 100;
      const pct = total > 0 ? (score / total) * 100 : 0;
      if (pct >= 90)  points += 50;
      if (pct === 100) points += 100;
    }
  }
  const allPassed = Array.from({ length: 5 }, (_, i) =>
    data[`pp_l${i + 1}_passed`] === "true"
  ).every(Boolean);
  if (allPassed) points += 200;
  return points;
}

export function getCurrentEcoTier(points) {
  return ECO_TIERS.find(t => points >= t.minPoints && points <= t.maxPoints);
}

export function calculateAchievements(data) {
  const scores = Array.from({ length: 5 }, (_, i) => {
    const score = parseInt(data[`pp_l${i + 1}_score`] || "0", 10);
    const total = parseInt(data[`pp_l${i + 1}_total`] || "10", 10);
    return total > 0 ? (score / total) * 100 : 0;
  });
  const passed       = Array.from({ length: 5 }, (_, i) => data[`pp_l${i + 1}_passed`] === "true");
  const pledges      = Array.from({ length: 5 }, (_, i) => !!data[`pp_l${i + 1}_pledge`]);
  const actions      = Array.from({ length: 5 }, (_, i) => !!data[`pp_l${i + 1}_action`]);
  const completedCnt = passed.filter(Boolean).length;
  const pledgeCnt    = pledges.filter(Boolean).length;
  const prevScores   = JSON.parse(data.pp_prev_scores || "{}");

return {
  momentum: completedCnt >= 3,
  sharp:    scores.some(p => p >= 90),
  perfect:  scores.some(p => p === 100),
  growth:   Array.from({ length: 5 }, (_, i) => {
              const curr = parseInt(data[`pp_l${i + 1}_score`] || "0", 10);
              const prev = parseInt(prevScores[i + 1] || "0", 10);
              return curr > prev && prev > 0;
            }).some(Boolean),
  impact:   completedCnt === 5,
};
}