// app/api/certificates/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs/promises';

export async function GET() {
  let db;
  try {
    const dbPath = path.join(process.cwd(), 'data', 'portalplus.db');
    
    // Check if database exists
    try {
      await fs.access(dbPath);
    } catch {
      // Database doesn't exist yet
      return NextResponse.json({
        success: true,
        certificates: [],
      });
    }
    
    db = new Database(dbPath);
    
    const certificates = db.prepare(`
      SELECT * FROM certificates 
      ORDER BY createdAt DESC
    `).all();
    
    return NextResponse.json({
      success: true,
      certificates,
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch certificates'
    }, { status: 500 });
  } finally {
    if (db) db.close();
  }
}