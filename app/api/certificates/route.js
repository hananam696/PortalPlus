import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  let db;
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: true, certificates: [] });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userId = decoded.userId;

    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
    try {
      await fs.access(dbPath);
    } catch {
      return NextResponse.json({ success: true, certificates: [] });
    }

    db = new Database(dbPath);

    const cols = db.prepare("PRAGMA table_info(certificates)").all();
    const hasUrl = cols.some(c => c.name === 'fileUrl');
    if (!hasUrl) {
      db.prepare("ALTER TABLE certificates ADD COLUMN fileUrl TEXT").run();
    }

    const certificates = db.prepare(`
      SELECT * FROM certificates WHERE userId = ? ORDER BY createdAt DESC
    `).all(userId);

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
    const authHeader = req.headers.get('authorization');
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userId = decoded.userId;

    const { id } = await req.json();
    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
    db = new Database(dbPath);

    const cert = db.prepare("SELECT * FROM certificates WHERE id = ? AND userId = ?").get(id, userId);
    if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (cert.fileName) {
      const { BlobServiceClient } = await import('@azure/storage-blob');
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );
      const containerClient = blobServiceClient.getContainerClient(
        process.env.AZURE_CONTAINER_NAME || 'certificates'
      );
      await containerClient.getBlockBlobClient(cert.fileName).deleteIfExists();
    }

    db.prepare("DELETE FROM certificates WHERE id = ? AND userId = ?").run(id, userId);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  } finally {
    if (db) db.close();
  }
}