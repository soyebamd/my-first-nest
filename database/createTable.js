import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

async function createTable() {
  const db = await open({
    filename: path.join(path.dirname(fileURLToPath(import.meta.url)), 'user_profile.db'),
    driver: sqlite3.Database,
  });

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS userprofile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
    console.log('Table created successfully.');
  } finally {
    await db.close();
  }
}

await createTable();
