import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>,
  ) {}

  create(data: Partial<Patient>) {
    return this.repository.create(data);
  }
  save(patient: Patient) {
    return this.repository.save(patient);
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
  remove(patient: Patient) {
    return this.repository.remove(patient);
  }
}
