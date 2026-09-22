import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';
import { AuthModule } from './domains/auth/auth.module';
import { PatientModule } from './domains/patient/patient.module';
import { PhysicianModule } from './domains/physician/physician.module';
import { LabTestModule } from './domains/lab-test/lab-test.module';
import { LabOrderModule } from './domains/lab-order/lab-order.module';
import { LabResultModule } from './domains/lab-result/lab-result.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    AuthModule,
    PatientModule,
    PhysicianModule,
    LabTestModule,
    LabOrderModule,
    LabResultModule,
  ],
})
export class AppModule {}
