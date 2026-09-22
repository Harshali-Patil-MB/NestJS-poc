import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Physician } from '../entities/physician.entity';

@Injectable()
export class PhysicianRepository {
  constructor(
    @InjectRepository(Physician)
    private readonly repository: Repository<Physician>,
  ) {}
  create(data: Partial<Physician>) {
    return this.repository.create(data);
  }
  save(physician: Physician) {
    return this.repository.save(physician);
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
