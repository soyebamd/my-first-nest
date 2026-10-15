import {
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { open, type Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';
import type { CreateProfileDto } from './dto/create-profile.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';

type Profile = {
  id: number;
  name: string;
  description: string;
};

@Injectable()
export class ProfileService implements OnModuleInit, OnModuleDestroy {
  private db!: Database;

  async onModuleInit() {
    this.db = await open({
      filename: path.join(process.cwd(), 'database', 'user_profile.db'),
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS userprofile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
  }

  async onModuleDestroy() {
    await this.db.close();
  }

  findAll(): Promise<Profile[]> {
    return this.db.all<Profile[]>(
      'SELECT id, username AS name, description FROM userprofile',
    );
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.db.get<Profile>(
      'SELECT id, username AS name, description FROM userprofile WHERE id = ?',
      id,
    );

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async create(profile: CreateProfileDto): Promise<Profile> {
    const result = await this.db.run(
      'INSERT INTO userprofile (username, description) VALUES (?, ?)',
      [profile.name, profile.description],
    );

    if (result.lastID === undefined) {
      throw new Error('SQLite did not return the ID of the inserted profile');
    }

    return this.findOne(result.lastID);
  }

  async update(id: number, profile: UpdateProfileDto): Promise<Profile> {
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (profile.name !== undefined) {
      updates.push('username = ?');
      values.push(profile.name);
    }

    if (profile.description !== undefined) {
      updates.push('description = ?');
      values.push(profile.description);
    }

    if (updates.length === 0) {
      return this.findOne(id);
    }

    values.push(id);
    const result = await this.db.run(
      `UPDATE userprofile SET ${updates.join(', ')} WHERE id = ?`,
      values,
    );

    if (result.changes === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.db.run(
      'DELETE FROM userprofile WHERE id = ?',
      id,
    );

    if (result.changes === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
