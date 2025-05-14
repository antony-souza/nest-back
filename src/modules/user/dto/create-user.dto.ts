import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseDto } from 'src/core/dto/base-dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  storeId?: string;
}
