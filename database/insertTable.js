import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

async function createTable() {
  const db = await open({
    filename: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'user_profile.db',
    ),
    driver: sqlite3.Database,
  });

  const profiles = [
    {
      username: 'Soyeb Ahmed',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`,
    },
  ];

  try {
    await db.exec('BEGIN');

    for (const profile of profiles) {
      await db.run(
        'INSERT INTO userprofile (username, description) VALUES (?, ?)',
        [profile.username, profile.description],
      );
    }

    await db.exec('COMMIT');

    console.log('Data inserted successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
}

await createTable();
