import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { PhysicianService } from '../service/physician.service';
import { CreatePhysicianDto } from '../dto/physician.dto';
class IdParam {
  @IsUUID() id: string;
}
@Controller('physicians')
export class PhysicianController {
  constructor(private readonly service: PhysicianService) {}
  @Post() create(@Body() dto: CreatePhysicianDto) {
    return this.service.create(dto);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param() p: IdParam) {
    return this.service.findOne(p.id);
  }
}
