import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  let db;
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userId = decoded.userId;

    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || 'Certificate';
    const type = formData.get('type') || 'Other';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, JPEG, PNG allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_CONTAINER_NAME || 'certificates'
    );

    const ext = path.extname(file.name);
    const blobName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    const url = blockBlobClient.url;

    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        fileUrl TEXT NOT NULL,
        fileName TEXT NOT NULL,
        originalName TEXT NOT NULL,
        fileSize INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = db.prepare(`
      INSERT INTO certificates (userId, title, type, date, fileUrl, fileName, originalName, fileSize)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      title,
      type,
      new Date().toISOString().split('T')[0],
      url,
      blobName,
      file.name,
      file.size
    );

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid,
      url,
      title,
      type,
      date: new Date().toISOString().split('T')[0],
      originalName: file.name,
      fileName: file.name,
      size: file.size,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  } finally {
    if (db) db.close();
  }
}