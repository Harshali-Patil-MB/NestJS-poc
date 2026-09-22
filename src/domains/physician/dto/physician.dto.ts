import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreatePhysicianDto {
  @IsString() @IsNotEmpty() @MaxLength(100) firstName: string;
  @IsString() @IsNotEmpty() @MaxLength(100) lastName: string;
  @IsString() @MaxLength(150) specialization: string;
  @IsString() @MaxLength(100) licenseNumber: string;
}
