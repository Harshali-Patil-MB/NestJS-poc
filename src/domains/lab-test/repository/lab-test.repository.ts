import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabTest } from '../entities/lab-test.entity';

@Injectable()
export class LabTestRepository {
  constructor(
    @InjectRepository(LabTest) private readonly repository: Repository<LabTest>,
  ) {}
  create(data: Partial<LabTest>) {
    return this.repository.create(data);
  }
  save(labTest: LabTest) {
    return this.repository.save(labTest);
  }
  findAll() {
    return this.repository.find();
  }
  findById(id: string) {
    return this.repository.findOneBy({ id });
  }
  existsById(id: string) {
    return this.repository.existsBy({ id });
  }
}
