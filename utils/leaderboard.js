/**
 * utils/leaderboard.js
 * Uses your existing MongoDB API instead of Firestore.
 */

export async function writeLeaderboardEntry({
  uid, displayName, ecoPoints, tierName, levelsCompleted, badgeCount
}) {
  try {
    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, displayName, ecoPoints, tierName, levelsCompleted, badgeCount }),
    });
  } catch (e) {
    console.warn("Leaderboard write failed:", e);
  }
}

export async function fetchLeaderboard(topN = 20) {
  try {
    const res  = await fetch(`/api/leaderboard?limit=${topN}`);
    const data = await res.json();
    return data.success ? data.entries : [];
  } catch (e) {
    console.warn("Leaderboard fetch failed:", e);
    return [];
  }
}