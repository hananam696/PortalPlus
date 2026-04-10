import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs/promises';

export async function GET() {
  let db;
  try {
    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');

    try {
      await fs.access(dbPath);
    } catch {
      return NextResponse.json({ success: true, certificates: [] });
    }

    db = new Database(dbPath);

    // Make sure url column exists (safe migration)
    const cols = db.prepare("PRAGMA table_info(certificates)").all();
    const hasUrl = cols.some(c => c.name === 'url');
    if (!hasUrl) {
      db.prepare("ALTER TABLE certificates ADD COLUMN url TEXT").run();
    }

    const certificates = db.prepare(`
      SELECT * FROM certificates ORDER BY createdAt DESC
    `).all();

    return NextResponse.json({ success: true, certificates });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch certificates' }, { status: 500 });
  } finally {
    if (db) db.close();
  }
}

export async function DELETE(req) {
  let db;
  try {
    const { id } = await req.json();
    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
    db = new Database(dbPath);

    const cert = db.prepare("SELECT * FROM certificates WHERE id = ?").get(id);
    if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Delete blob from Azure
    if (cert.url) {
      const { BlobServiceClient } = await import('@azure/storage-blob');
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );
      const containerClient = blobServiceClient.getContainerClient(
        process.env.AZURE_CONTAINER_NAME || 'certificates'
      );
      // Extract blob name from URL
      const blobName = cert.url.split('/').pop();
      await containerClient.getBlockBlobClient(blobName).deleteIfExists();
    }

    db.prepare("DELETE FROM certificates WHERE id = ?").run(id);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  } finally {
    if (db) db.close();
  }
}