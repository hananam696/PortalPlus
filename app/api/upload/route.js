// app/api/upload/route.js
import { BlobServiceClient } from "@azure/storage-blob";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 5MB allowed." },
        { status: 400 }
      );
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = "rental-images"; // separate container from certificates

    if (!connectionString) {
      return NextResponse.json(
        { error: "Azure storage not configured" },
        { status: 500 }
      );
    }

    // Connect to Azure Blob Storage
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient =
      blobServiceClient.getContainerClient(containerName);

    // Create container if it doesn't exist (public access so images load in browser)
    await containerClient.createIfNotExists({ access: "blob" });

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const blobName = `${uuidv4()}.${ext}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Convert file to buffer and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    const imageUrl = blockBlobClient.url;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}