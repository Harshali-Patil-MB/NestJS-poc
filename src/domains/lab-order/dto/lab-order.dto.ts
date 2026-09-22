import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { LabOrderPriority } from '../enums/lab-order-priority.enum';
import { LabOrderStatus } from '../enums/lab-order-status.enum';
export class CreateLabOrderDto {
  @IsUUID() patientId: string;
  @IsUUID() physicianId: string;
  @IsUUID() labTestId: string;
  @IsOptional() @IsEnum(LabOrderPriority) priority?: LabOrderPriority;
  @IsOptional() @IsDateString() orderedAt?: string;
}
export class UpdateLabOrderStatusDto {
  @IsEnum(LabOrderStatus) status: LabOrderStatus;
}
