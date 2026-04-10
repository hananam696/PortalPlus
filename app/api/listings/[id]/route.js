// import { NextResponse } from "next/server";
// import clientPromise from "../../../lib/mongodb";
// import { ObjectId } from "mongodb";

// // ✅ DELETE LISTING (with user verification)
// export async function DELETE(req, { params }) {
//   try {
//     // Get userId from request body
//     const body = await req.json();
//     const { userId } = body;

//     if (!userId) {
//       return NextResponse.json({
//         error: "User ID required. Please login first."
//       }, { status: 401 });
//     }

//     const client = await clientPromise;
//     const db = client.db("portalplus");

//     const id = params.id;

//     // ✅ Only delete if listing belongs to this user
//     const result = await db.collection("listings").deleteOne({
//       _id: new ObjectId(id),
//       userId: userId,  // ✅ Verify ownership
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json({
//         error: "Listing not found or you don't have permission to delete it"
//       }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

// // ✅ UPDATE LISTING (with user verification)
// export async function PUT(req, { params }) {
//   try {
//     const body = await req.json();
//     const { userId, ...updatedData } = body;

//     if (!userId) {
//       return NextResponse.json({
//         error: "User ID required. Please login first."
//       }, { status: 401 });
//     }

//     const client = await clientPromise;
//     const db = client.db("portalplus");

//     const id = params.id;

//     // Remove fields that shouldn't be updated
//     delete updatedData._id;
//     delete updatedData.createdAt;
//     delete updatedData.userId;
//     delete updatedData.userEmail;
//     delete updatedData.userName;

//     // ✅ Only update if listing belongs to this user
//     const result = await db.collection("listings").updateOne(
//       {
//         _id: new ObjectId(id),
//         userId: userId  // ✅ Verify ownership
//       },
//       { $set: { ...updatedData, updatedAt: new Date() } }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json({
//         error: "Listing not found or you don't have permission to edit it"
//       }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "Updated successfully" });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import clientPromise from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    let userId = null;
    try {
      const body = await req.json();
      userId = body.userId;
    } catch (e) {
      // no body sent
    }

    const id = params.id;
    console.log("DELETE id:", id);
    console.log("DELETE userId:", userId);

    const client = await clientPromise;
    const db = client.db("portalplus");

    const result = await db.collection("listings").deleteOne({
      _id: new ObjectId(id),
      userId: userId,
    });

    console.log("DELETE result:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found or no permission" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// ✅ UPDATE LISTING (with user verification)
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { userId, ...updatedData } = body;

    if (!userId) {
      return NextResponse.json({
        error: "User ID required. Please login first."
      }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("portalplus");

    const id = params.id;

    // Remove fields that shouldn't be updated
    delete updatedData._id;
    delete updatedData.createdAt;
    delete updatedData.userId;
    delete updatedData.userEmail;
    delete updatedData.userName;

    // ✅ Only update if listing belongs to this user
    const result = await db.collection("listings").updateOne(
      {
        _id: new ObjectId(id),
        userId: userId  // ✅ Verify ownership
      },
      { $set: { ...updatedData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        error: "Listing not found or you don't have permission to edit it"
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("portalplus");
    const item = await db.collection("listings").findOne({ _id: new ObjectId(params.id) });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...item, _id: item._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}