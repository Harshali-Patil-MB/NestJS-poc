import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabResult } from '../entities/lab-result.entity';

@Injectable()
export class LabResultRepository {
  constructor(
    @InjectRepository(LabResult)
    private readonly repository: Repository<LabResult>,
  ) {}
  create(data: Partial<LabResult>) {
    return this.repository.create(data);
  }
  save(labResult: LabResult) {
    return this.repository.save(labResult);
  }
  findByLabOrderId(labOrderId: string) {
    return this.repository.findOneBy({ labOrderId });
  }
  existsByLabOrderId(labOrderId: string) {
    return this.repository.existsBy({ labOrderId });
  }
}
