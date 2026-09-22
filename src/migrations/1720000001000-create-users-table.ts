import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1720000001000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(
      `CREATE TYPE user_role_enum AS ENUM ('PHYSICIAN','LAB_TECHNICIAN')`,
    );
    await q.query(
      `CREATE TABLE users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email varchar(254) NOT NULL UNIQUE, password_hash varchar(255) NOT NULL, role user_role_enum NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`,
    );
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query('DROP TABLE IF EXISTS users');
    await q.query('DROP TYPE IF EXISTS user_role_enum');
  }
}
