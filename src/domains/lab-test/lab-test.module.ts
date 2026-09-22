import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './entities/lab-test.entity';
import { LabTestController } from './controller/lab-test.controller';
import { LabTestRepository } from './repository/lab-test.repository';
import { LabTestService } from './service/lab-test.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabTest])],
  controllers: [LabTestController],
  providers: [LabTestService, LabTestRepository],
  exports: [LabTestRepository],
})
export class LabTestModule {}
