import { IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  @IsOptional()
  id?: string;
}
