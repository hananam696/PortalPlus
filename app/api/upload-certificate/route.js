// // app/api/upload-certificate/route.js
// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';
// import Database from 'better-sqlite3';

// export async function POST(request) {
//   let db;
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');
//     const title = formData.get('title') || 'Certificate';
//     const type = formData.get('type') || 'Other';
//     const userId = 'demo-user-123';

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     // Validate file
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//     if (!allowedTypes.includes(file.type)) {
//       return NextResponse.json(
//         { error: 'Invalid file type. Only PDF, JPEG, PNG allowed' },
//         { status: 400 }
//       );
//     }

//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       return NextResponse.json(
//         { error: 'File size exceeds 5MB limit' },
//         { status: 400 }
//       );
//     }

//     // Save file locally
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'certificates');
//     await fs.mkdir(uploadDir, { recursive: true });

//     const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
//     const filePath = path.join(uploadDir, fileName);
//     const fileUrl = `/uploads/certificates/${fileName}`;

//     await fs.writeFile(filePath, buffer);

//     // Save to SQLite database
//     const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
//     await fs.mkdir(path.dirname(dbPath), { recursive: true });

//     db = new Database(dbPath);

//     // Create table if not exists
//     db.exec(`
//       CREATE TABLE IF NOT EXISTS certificates (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         userId TEXT,
//         title TEXT NOT NULL,
//         type TEXT NOT NULL,
//         date TEXT NOT NULL,
//         fileUrl TEXT NOT NULL,
//         fileName TEXT NOT NULL,
//         originalName TEXT NOT NULL,
//         fileSize INTEGER NOT NULL,
//         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Insert certificate
//     const stmt = db.prepare(`
//       INSERT INTO certificates
//       (userId, title, type, date, fileUrl, fileName, originalName, fileSize)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `);

//     const result = stmt.run(
//       userId,
//       title,
//       type,
//       new Date().toISOString().split('T')[0],
//       fileUrl,
//       fileName,
//       file.name,
//       file.size
//     );

//     const certificateId = result.lastInsertRowid;

//     return NextResponse.json({
//       success: true,
//       id: certificateId,
//       url: fileUrl,
//       title,
//       type,
//       date: new Date().toISOString().split('T')[0],
//       originalName: file.name,
//       fileName: file.name,
//       size: file.size,
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({
//       error: 'Upload failed. Please try again.'
//     }, { status: 500 });
//   } finally {
//     if (db) db.close();
//   }
// }
import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs/promises';

export async function POST(request) {
  let db;
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || 'Certificate';
    const type = formData.get('type') || 'Other';
    const userId = 'demo-user-123'; // will replace with real auth later

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, JPEG, PNG allowed' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Upload to Azure Blob Storage
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

    // Save to SQLite
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