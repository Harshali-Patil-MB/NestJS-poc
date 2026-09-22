import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhysicianDto } from '../dto/physician.dto';
import { PhysicianRepository } from '../repository/physician.repository';

@Injectable()
export class PhysicianService {
  constructor(private readonly physicianRepository: PhysicianRepository) {}

  async create(dto: CreatePhysicianDto) {
    try {
      return await this.physicianRepository.save(
        this.physicianRepository.create(dto),
      );
    } catch {
      throw new ConflictException('License number already exists');
    }
  }

  findAll() {
    return this.physicianRepository.findAll();
  }

  async findOne(id: string) {
    const item = await this.physicianRepository.findById(id);
    if (!item) throw new NotFoundException('Physician not found');
    return item;
  }
}
