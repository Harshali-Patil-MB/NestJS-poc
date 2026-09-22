import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateLabTestDto {
  @IsString() @IsNotEmpty() @MaxLength(150) name: string;
  @IsString() @IsNotEmpty() @MaxLength(100) code: string;
  @IsOptional() @IsString() description?: string;
  @IsString() @MaxLength(100) category: string;
}
