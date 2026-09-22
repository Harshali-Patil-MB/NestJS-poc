import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { LabTestService } from '../service/lab-test.service';
import { CreateLabTestDto } from '../dto/lab-test.dto';
class IdParam {
  @IsUUID() id: string;
}
@Controller('lab-tests')
export class LabTestController {
  constructor(private readonly service: LabTestService) {}
  @Post() create(@Body() dto: CreateLabTestDto) {
    return this.service.create(dto);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param() p: IdParam) {
    return this.service.findOne(p.id);
  }
}
