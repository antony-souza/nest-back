import { IsString } from 'class-validator';
import { BaseDto } from 'src/core/dto/base-dto';

export class CreateStoreDto extends BaseDto {
  @IsString()
  name: string;
}
