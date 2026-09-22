import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { LabResultService } from '../service/lab-result.service';
import { CreateLabResultDto } from '../dto/lab-result.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/enums/user-role.enum';
class IdParam {
  @IsUUID() id: string;
}
@Controller('lab-orders/:id/result')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LabResultController {
  constructor(private readonly service: LabResultService) {}
  @Post()
  @Roles(UserRole.LAB_TECHNICIAN)
  create(@Param() p: IdParam, @Body() dto: CreateLabResultDto) {
    return this.service.create(p.id, dto);
  }
  @Get()
  @Roles(UserRole.PHYSICIAN, UserRole.LAB_TECHNICIAN)
  find(@Param() p: IdParam) {
    return this.service.findByOrderId(p.id);
  }
}
