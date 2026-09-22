import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResult } from './entities/lab-result.entity';
import { LabResultController } from './controller/lab-result.controller';
import { AuthModule } from '../auth/auth.module';
import { LabOrderModule } from '../lab-order/lab-order.module';
import { LabResultRepository } from './repository/lab-result.repository';
import { LabResultService } from './service/lab-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabResult]), AuthModule, LabOrderModule],
  controllers: [LabResultController],
  providers: [LabResultService, LabResultRepository],
})
export class LabResultModule {}
