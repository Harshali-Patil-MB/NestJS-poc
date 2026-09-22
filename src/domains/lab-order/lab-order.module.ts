import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabOrder } from './entities/lab-order.entity';
import { LabOrderController } from './controller/lab-order.controller';
import { AuthModule } from '../auth/auth.module';
import { PatientModule } from '../patient/patient.module';
import { PhysicianModule } from '../physician/physician.module';
import { LabTestModule } from '../lab-test/lab-test.module';
import { LabOrderRepository } from './repository/lab-order.repository';
import { LabOrderService } from './service/lab-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabOrder]),
    AuthModule,
    PatientModule,
    PhysicianModule,
    LabTestModule,
  ],
  controllers: [LabOrderController],
  providers: [LabOrderService, LabOrderRepository],
  exports: [LabOrderRepository],
})
export class LabOrderModule {}
