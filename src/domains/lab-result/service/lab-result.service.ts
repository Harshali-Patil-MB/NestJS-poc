import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LabOrderStatus } from '../../lab-order/enums/lab-order-status.enum';
import { CreateLabResultDto } from '../dto/lab-result.dto';
import { LabOrderRepository } from '../../lab-order/repository/lab-order.repository';
import { LabResultRepository } from '../repository/lab-result.repository';

@Injectable()
export class LabResultService {
  constructor(
    private readonly labResultRepository: LabResultRepository,
    private readonly labOrderRepository: LabOrderRepository,
  ) {}

  async create(orderId: string, dto: CreateLabResultDto) {
    //if order exists
    const order = await this.labOrderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Lab order not found');
    //if its cancelled
    if (order.status === LabOrderStatus.CANCELLED)
      throw new BadRequestException('Cancelled order cannot receive a result');
    if (
      ![LabOrderStatus.PROCESSING, LabOrderStatus.COMPLETED].includes(
        order.status,
      )
    )
      throw new BadRequestException('Order must be PROCESSING or COMPLETED');

    if (await this.labResultRepository.existsByLabOrderId(orderId))
      throw new ConflictException('Result already exists for this lab order');

    const result = await this.labResultRepository.save(
      this.labResultRepository.create({
        ...dto,
        labOrderId: orderId,
        resultedAt: dto.resultedAt ? new Date(dto.resultedAt) : new Date(),
      }),
    );
    order.status = LabOrderStatus.COMPLETED;
    await this.labOrderRepository.save(order);
    return result;
  }

  async findByOrderId(orderId: string) {
    const result = await this.labResultRepository.findByLabOrderId(orderId);
    if (!result) throw new NotFoundException('Lab result not found');
    return result;
  }
}
