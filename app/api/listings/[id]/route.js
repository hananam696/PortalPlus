import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    console.log("DELETE HIT"); // debug

    const client = await clientPromise;
    const db = client.db("portalplus");

    const id = params.id.trim();

    console.log("Deleting ID:", id); // debug

    const result = await db.collection("listings").deleteOne({
      _id: new ObjectId(id),
    });

    console.log("Delete result:", result); // 👈 debug

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" });
  }
}