import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from './entities/physician.entity';
import { PhysicianController } from './controller/physician.controller';
import { PhysicianRepository } from './repository/physician.repository';
import { PhysicianService } from './service/physician.service';

@Module({
  imports: [TypeOrmModule.forFeature([Physician])],
  controllers: [PhysicianController],
  providers: [PhysicianService, PhysicianRepository],
  exports: [PhysicianRepository],
})
export class PhysicianModule {}
