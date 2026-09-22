import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateLabResultDto {
  @IsString() @IsNotEmpty() @MaxLength(255) resultValue: string;
  @IsString() @IsNotEmpty() @MaxLength(50) unit: string;
  @IsOptional() @IsString() @MaxLength(255) referenceRange?: string;
  @IsOptional() @IsString() remarks?: string;
  @IsOptional() @IsDateString() resultedAt?: string;
}
