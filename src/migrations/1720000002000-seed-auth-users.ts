import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedAuthUsers1720000002000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash('password123', 10);

    await q.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'PHYSICIAN')`,
      ['doctor@example.com', passwordHash],
    );
    await q.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'LAB_TECHNICIAN')`,
      ['labtech@example.com', passwordHash],
    );
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      `DELETE FROM users WHERE email IN ('doctor@example.com', 'labtech@example.com')`,
    );
  }
}
