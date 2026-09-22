import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '../domains/auth/entities/user.entity';
import { Patient } from '../domains/patient/entities/patient.entity';
import { Physician } from '../domains/physician/entities/physician.entity';
import { LabTest } from '../domains/lab-test/entities/lab-test.entity';
import { LabOrder } from '../domains/lab-order/entities/lab-order.entity';
import { LabResult } from '../domains/lab-result/entities/lab-result.entity';

import { InitialLabSchema1720000000000 } from '../migrations/1720000000000-initial-lab-schema';
import { CreateUsersTable1720000001000 } from '../migrations/1720000001000-create-users-table';
import { SeedAuthUsers1720000002000 } from '../migrations/1720000002000-seed-auth-users';

export default new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'lab_test_management',

  entities: [User, Patient, Physician, LabTest, LabOrder, LabResult],

  migrations: [
    InitialLabSchema1720000000000,
    CreateUsersTable1720000001000,
    SeedAuthUsers1720000002000,
  ],

  synchronize: false,
});
