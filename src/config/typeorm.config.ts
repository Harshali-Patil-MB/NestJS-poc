import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../domains/auth/entities/user.entity';
import { Patient } from '../domains/patient/entities/patient.entity';
import { Physician } from '../domains/physician/entities/physician.entity';
import { LabTest } from '../domains/lab-test/entities/lab-test.entity';
import { LabOrder } from '../domains/lab-order/entities/lab-order.entity';
import { LabResult } from '../domains/lab-result/entities/lab-result.entity';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'lab_test_management',
  entities: [User, Patient, Physician, LabTest, LabOrder, LabResult],
  synchronize: false,
};
