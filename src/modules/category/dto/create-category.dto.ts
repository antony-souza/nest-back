import { IsString } from 'class-validator';
import { BaseDto } from 'src/core/dto/base-dto';

export class CreateCategoryDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  storeId: string;
}
