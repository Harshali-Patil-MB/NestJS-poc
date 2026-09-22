import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialLabSchema1720000000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await q.query(
      `CREATE TYPE lab_order_status_enum AS ENUM ('ORDERED','SAMPLE_COLLECTED','PROCESSING','COMPLETED','CANCELLED')`,
    );
    await q.query(
      `CREATE TYPE lab_order_priority_enum AS ENUM ('NORMAL','URGENT')`,
    );
    await q.query(
      `CREATE TABLE patients (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), first_name varchar(100) NOT NULL, last_name varchar(100) NOT NULL, date_of_birth date NOT NULL, gender varchar(30) NOT NULL, phone varchar(30) NOT NULL, email varchar(254) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
    );
    await q.query(
      `CREATE TABLE physicians (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), first_name varchar(100) NOT NULL, last_name varchar(100) NOT NULL, specialization varchar(150) NOT NULL, license_number varchar(100) NOT NULL UNIQUE, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
    );
    await q.query(
      `CREATE TABLE lab_tests (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name varchar(150) NOT NULL, code varchar(100) NOT NULL UNIQUE, description text, category varchar(100) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
    );
    await q.query(
      `CREATE TABLE lab_orders (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), patient_id uuid NOT NULL, physician_id uuid NOT NULL, lab_test_id uuid NOT NULL, status lab_order_status_enum NOT NULL DEFAULT 'ORDERED', priority lab_order_priority_enum NOT NULL DEFAULT 'NORMAL', ordered_at timestamptz NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), CONSTRAINT fk_lab_orders_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE RESTRICT, CONSTRAINT fk_lab_orders_physician FOREIGN KEY (physician_id) REFERENCES physicians(id) ON DELETE RESTRICT, CONSTRAINT fk_lab_orders_test FOREIGN KEY (lab_test_id) REFERENCES lab_tests(id) ON DELETE RESTRICT)`,
    );
    await q.query(
      `CREATE TABLE lab_results (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lab_order_id uuid NOT NULL UNIQUE, result_value varchar(255) NOT NULL, unit varchar(50) NOT NULL, reference_range varchar(255), remarks text, resulted_at timestamptz NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), CONSTRAINT fk_lab_results_order FOREIGN KEY (lab_order_id) REFERENCES lab_orders(id) ON DELETE CASCADE)`,
    );
    await q.query(
      'CREATE INDEX idx_lab_orders_patient_id ON lab_orders(patient_id)',
    );
    await q.query(
      'CREATE INDEX idx_lab_orders_physician_id ON lab_orders(physician_id)',
    );
    await q.query(
      'CREATE INDEX idx_lab_orders_lab_test_id ON lab_orders(lab_test_id)',
    );
    await q.query('CREATE INDEX idx_lab_orders_status ON lab_orders(status)');
    await q.query(
      'CREATE INDEX idx_lab_orders_ordered_at ON lab_orders(ordered_at)',
    );
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query('DROP TABLE IF EXISTS lab_results');
    await q.query('DROP TABLE IF EXISTS lab_orders');
    await q.query('DROP TABLE IF EXISTS lab_tests');
    await q.query('DROP TABLE IF EXISTS physicians');
    await q.query('DROP TABLE IF EXISTS patients');
    await q.query('DROP TYPE IF EXISTS lab_order_priority_enum');
    await q.query('DROP TYPE IF EXISTS lab_order_status_enum');
  }
}
