import { ApiProperty } from '@nestjs/swagger';
import { ReadAnimalDto } from './read-animals.dto';

export class ListAnimalsDto {
  @ApiProperty({ type: [ReadAnimalDto] })
  data: ReadAnimalDto[];

  @ApiProperty()
  total: number;
}
