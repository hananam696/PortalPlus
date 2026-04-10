// import clientPromise from "../../../utils/mongodb";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// // ✅ CREATE LISTING (with user association)
// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const client = await clientPromise;
//     const db = client.db("portalplus");

//     // ✅ Get user info from request body (sent from frontend after login)
//     const { userId, userEmail, userName } = body;

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         error: "User ID required. Please login first."
//       }, { status: 401 });
//     }

//     const newListing = {
//       ...body,
//       userId,        // ✅ Store user ID
//       userEmail,     // ✅ Store user email
//       userName,      // ✅ Store user name
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     const result = await db.collection("listings").insertOne(newListing);

//     return NextResponse.json({
//       success: true,
//       id: result.insertedId,
//     });
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // ✅ GET LISTINGS (filter by userId if provided)
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get('userId');

//     const client = await clientPromise;
//     const db = client.db("portalplus");

//     let query = {};

//     // ✅ If userId is provided, ONLY return that user's listings
//     if (userId) {
//       query.userId = userId;
//     }

//     const listings = await db
//       .collection("listings")
//       .find(query)
//       .sort({ createdAt: -1 })
//       .toArray();

//     // Convert _id to string
//     const formatted = listings.map((item) => ({
//       ...item,
//       _id: item._id.toString(),
//     }));

//     return NextResponse.json(formatted);
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // ✅ DELETE LISTING (verify ownership)
// export async function DELETE(req) {
//   try {
//     const { id, userId } = await req.json();

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         error: "User ID required"
//       }, { status: 401 });
//     }

//     const client = await clientPromise;
//     const db = client.db("portalplus");

//     // ✅ Only delete if listing belongs to this user
//     const result = await db.collection("listings").deleteOne({
//       _id: new ObjectId(id),
//       userId: userId,  // ✅ Verify ownership
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json({
//         success: false,
//         error: "Listing not found or you don't have permission to delete it"
//       }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // ✅ UPDATE LISTING (verify ownership)
// export async function PUT(req) {
//   try {
//     const { id, updatedData, userId } = await req.json();

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         error: "User ID required"
//       }, { status: 401 });
//     }

//     const client = await clientPromise;
//     const db = client.db("portalplus");

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
//         success: false,
//         error: "Listing not found or you don't have permission to edit it"
//       }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
import clientPromise from "../../../utils/mongodb"; // ✅ unchanged
import { NextResponse } from "next/server";

// ✅ CREATE LISTING (with user association)
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("portalplus");

    const { userId, userEmail, userName } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID required. Please login first.",
        },
        { status: 401 }
      );
    }

    const newListing = {
      ...body,
      userId: String(userId), // 🔥 FIX (prevents mismatch later)
      userEmail,
      userName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("listings").insertOne(newListing);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET LISTINGS (filter by userId if provided)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("portalplus");

    let query = {};

    if (userId) {
      query.userId = String(userId); // 🔥 FIX (match DB)
    }

    const listings = await db
      .collection("listings")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = listings.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}