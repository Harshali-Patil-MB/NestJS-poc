import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLabTestDto } from '../dto/lab-test.dto';
import { LabTestRepository } from '../repository/lab-test.repository';

@Injectable()
export class LabTestService {
  constructor(private readonly labTestRepository: LabTestRepository) {}

  async create(dto: CreateLabTestDto) {
    try {
      return await this.labTestRepository.save(
        this.labTestRepository.create(dto),
      );
    } catch {
      throw new ConflictException('Lab test code already exists');
    }
  }

  findAll() {
    return this.labTestRepository.findAll();
  }

  async findOne(id: string) {
    const item = await this.labTestRepository.findById(id);
    if (!item) throw new NotFoundException('Lab test not found');
    return item;
  }
}
