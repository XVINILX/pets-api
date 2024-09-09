import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BreedsListDto {
  @ApiProperty()
  @IsString()
  breeds: string[];
}
