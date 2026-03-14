import clientPromise from "../../../utils/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("portalplus");

  return Response.json({ message: "Database connected!" });
}