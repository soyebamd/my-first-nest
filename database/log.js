import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function createTable() {
  const db = await open({
    filename: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'user_profile.db',
    ),
    driver: sqlite3.Database,
  });

  try {
    const getTable = await db.all('SELECT * FROM userprofile');
    console.table(getTable);
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
}

await createTable();
