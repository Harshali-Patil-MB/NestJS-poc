import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { PatientService } from '../service/patient.service';
import { CreatePatientDto, UpdatePatientDto } from '../dto/patient.dto';
class IdParam {
  @IsUUID() id: string;
}
@Controller('patients')
export class PatientController {
  constructor(private readonly service: PatientService) {}
  @Post() create(@Body() dto: CreatePatientDto) {
    return this.service.create(dto);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param() p: IdParam) {
    return this.service.findOne(p.id);
  }
  @Patch(':id') update(@Param() p: IdParam, @Body() dto: UpdatePatientDto) {
    return this.service.update(p.id, dto);
  }
  @Delete(':id') @HttpCode(204) remove(@Param() p: IdParam) {
    return this.service.remove(p.id);
  }
}
