import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/core/dto/base-dto';

export class CreateProductDto extends BaseDto {
  @IsString()
  name: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  description: string;

  @IsString()
  storeId: string;

  @IsString()
  categoryId: string;
}
