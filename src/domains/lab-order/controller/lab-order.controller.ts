import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { LabOrderService } from '../service/lab-order.service';
import {
  CreateLabOrderDto,
  UpdateLabOrderStatusDto,
} from '../dto/lab-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/enums/user-role.enum';

class IdParam {
  @IsUUID() id: string;
}
@Controller('lab-orders')
//attach guard to endpoint
@UseGuards(JwtAuthGuard, RolesGuard)
export class LabOrderController {
  constructor(private readonly service: LabOrderService) {}

  //create order
  @Post()
  @Roles(UserRole.PHYSICIAN)
  create(@Body() dto: CreateLabOrderDto) {
    return this.service.create(dto);
  }
  @Get()
  @Roles(UserRole.PHYSICIAN, UserRole.LAB_TECHNICIAN)
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  @Roles(UserRole.PHYSICIAN, UserRole.LAB_TECHNICIAN)
  findOne(@Param() p: IdParam) {
    return this.service.findOne(p.id);
  }
  @Patch(':id/status')
  @Roles(UserRole.LAB_TECHNICIAN)
  updateStatus(@Param() p: IdParam, @Body() dto: UpdateLabOrderStatusDto) {
    return this.service.updateStatus(p.id, dto);
  }
}
