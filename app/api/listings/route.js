import clientPromise from "../../../utils/mongodb";

export async function POST(req) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("portalplus");

  const result = await db.collection("listings").insertOne(body);

  return Response.json({
    success: true,
    id: result.insertedId,
  });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db("portalplus");

  const listings = await db.collection("listings").find({}).toArray();

  return Response.json(listings);
}
