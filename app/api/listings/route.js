import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

// ✅ CREATE LISTING
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("portalplus");

    const newListing = {
      ...body,
      userEmail: "student@udst.edu", // later from login
      createdAt: new Date(),
    };

    const result = await db.collection("listings").insertOne(newListing);

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
      .sort({ createdAt: -1 })
      .toArray();

    // 🔥 FIX: convert _id to string
    const formatted = listings.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return Response.json(formatted);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

// ✅ DELETE LISTING
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("portalplus");

    await db.collection("listings").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

// ✅ UPDATE LISTING
export async function PUT(req) {
  try {
    const { id, updatedData } = await req.json();

    const client = await clientPromise;
    const db = client.db("portalplus");

    await db.collection("listings").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}