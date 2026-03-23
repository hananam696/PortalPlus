import clientPromise from "../../../utils/mongodb";

// ✅ CREATE LISTING
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("portalplus");

    // ✅ Add extra fields (IMPORTANT)
    const newListing = {
      ...body,
      userEmail: "student@udst.edu", // 👈 for My Listings
      createdAt: new Date(),
    };

    const result = await db
      .collection("listings")
      .insertOne(newListing);

    return Response.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

// ✅ GET ALL LISTINGS
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portalplus");

    const listings = await db
      .collection("listings")
      .find({})
      .sort({ createdAt: -1 }) // 👈 newest first
      .toArray();

    return Response.json(listings);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}