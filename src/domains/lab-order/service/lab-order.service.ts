import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LabOrder } from '../entities/lab-order.entity';
import { LabOrderStatus } from '../enums/lab-order-status.enum';
import {
  CreateLabOrderDto,
  UpdateLabOrderStatusDto,
} from '../dto/lab-order.dto';
import { PatientRepository } from '../../patient/repository/patient.repository';
import { PhysicianRepository } from '../../physician/repository/physician.repository';
import { LabTestRepository } from '../../lab-test/repository/lab-test.repository';
import { LabOrderRepository } from '../repository/lab-order.repository';

@Injectable()
export class LabOrderService {
  constructor(
    private readonly labOrderRepository: LabOrderRepository,
    private readonly patientRepository: PatientRepository,
    private readonly physicianRepository: PhysicianRepository,
    private readonly labTestRepository: LabTestRepository,
  ) {}

  async create(dto: CreateLabOrderDto) {
    if (!(await this.patientRepository.existsById(dto.patientId)))
      throw new NotFoundException('Patient not found');
    if (!(await this.physicianRepository.existsById(dto.physicianId)))
      throw new NotFoundException('Physician not found');
    if (!(await this.labTestRepository.existsById(dto.labTestId)))
      throw new NotFoundException('Lab test not found');
    return this.labOrderRepository.save(
      this.labOrderRepository.create({
        ...dto,
        orderedAt: dto.orderedAt ? new Date(dto.orderedAt) : new Date(),
      }),
    );
  }

  findAll() {
    return this.labOrderRepository.findAllWithRelations();
  }

  async findOne(id: string) {
    const item = await this.labOrderRepository.findByIdWithRelations(id);
    if (!item) throw new NotFoundException('Lab order not found');
    return item;
  }

  async updateStatus(id: string, dto: UpdateLabOrderStatusDto) {
    const item = await this.findOne(id);

    if (!this.isValidStatusTransition(item.status, dto.status)) {
      throw new BadRequestException(
        `Invalid lab order status transition from ${item.status} to ${dto.status}`,
      );
    }

    item.status = dto.status;
    return this.labOrderRepository.save(item);
  }

  private isValidStatusTransition(
    currentStatus: LabOrderStatus,
    newStatus: LabOrderStatus,
  ): boolean {
    if (currentStatus === LabOrderStatus.ORDERED) {
      return (
        newStatus === LabOrderStatus.SAMPLE_COLLECTED ||
        newStatus === LabOrderStatus.CANCELLED
      );
    }

    if (currentStatus === LabOrderStatus.SAMPLE_COLLECTED) {
      return newStatus === LabOrderStatus.PROCESSING;
    }

    if (currentStatus === LabOrderStatus.PROCESSING) {
      return newStatus === LabOrderStatus.COMPLETED;
    }

    return false;
  }

  async complete(order: LabOrder) {
    order.status = LabOrderStatus.COMPLETED;
    return this.labOrderRepository.save(order);
  }
}
