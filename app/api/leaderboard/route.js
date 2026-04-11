import { connectDB } from "../../lib/mongodb";
import mongoose from "mongoose";

// Define schema inline — no separate model file needed
const leaderboardSchema = new mongoose.Schema({
  uid:              { type: String, required: true, unique: true },
  displayName:      { type: String, required: true },
  ecoPoints:        { type: Number, default: 0 },
  tierName:         { type: String, default: "Unaware" },
  levelsCompleted:  { type: Number, default: 0 },
  badgeCount:       { type: Number, default: 0 },
  updatedAt:        { type: Number, default: Date.now },
});

const Leaderboard = mongoose.models.Leaderboard ||
  mongoose.model("Leaderboard", leaderboardSchema);

// GET — fetch top N entries
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const topN = parseInt(searchParams.get("limit") || "20");

    const entries = await Leaderboard
      .find({})
      .sort({ ecoPoints: -1 })
      .limit(topN)
      .lean();

    return Response.json({ success: true, entries });
  } catch (err) {
    console.error("Leaderboard GET error:", err);
    return Response.json({ success: false, entries: [] });
  }
}

// POST — write or update a user's entry
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { uid, displayName, ecoPoints, tierName, levelsCompleted, badgeCount } = body;

    if (!uid || !displayName) {
      return Response.json({ success: false, error: "uid and displayName required" });
    }

    await Leaderboard.findOneAndUpdate(
      { uid },
      { uid, displayName, ecoPoints, tierName, levelsCompleted, badgeCount, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("Leaderboard POST error:", err);
    return Response.json({ success: false, error: err.message });
  }
}
export async function DELETE(req) {
  try {
    await connectDB();
    const { uid } = await req.json();

    if (!uid) {
      return Response.json({ success: false, error: "uid required" });
    }

    await Leaderboard.findOneAndDelete({ uid });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Leaderboard DELETE error:", err);
    return Response.json({ success: false, error: err.message });
  }
}