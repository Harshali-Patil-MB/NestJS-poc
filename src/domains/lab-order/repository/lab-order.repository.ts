import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabOrder } from '../entities/lab-order.entity';

@Injectable()
export class LabOrderRepository {
  constructor(
    @InjectRepository(LabOrder)
    private readonly repository: Repository<LabOrder>,
  ) {}
  create(data: Partial<LabOrder>) {
    return this.repository.create(data);
  }
  save(labOrder: LabOrder) {
    return this.repository.save(labOrder);
  }
  findAllWithRelations() {
    return this.repository.find({
      relations: {
        patient: true,
        physician: true,
        labTest: true,
        result: true,
      },
    });
  }
  findById(id: string) {
    return this.repository.findOneBy({ id });
  }
  findByIdWithRelations(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: {
        patient: true,
        physician: true,
        labTest: true,
        result: true,
      },
    });
  }
}
