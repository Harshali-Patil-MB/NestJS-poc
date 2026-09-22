import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from '../dto/patient.dto';
import { PatientRepository } from '../repository/patient.repository';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async create(dto: CreatePatientDto) {
    return this.patientRepository.save(this.patientRepository.create(dto));
  }

  findAll() {
    return this.patientRepository.findAll();
  }

  async findOne(id: string) {
    const item = await this.patientRepository.findById(id);
    if (!item) throw new NotFoundException('Patient not found');
    return item;
  }

  async update(id: string, dto: UpdatePatientDto) {
    const item = await this.findOne(id);
    return this.patientRepository.save(Object.assign(item, dto));
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    try {
      await this.patientRepository.remove(item);
    } catch {
      throw new ConflictException('Patient has related lab orders');
    }
  }
}
