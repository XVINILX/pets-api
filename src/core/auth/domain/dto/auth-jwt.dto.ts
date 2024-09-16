import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthJwtDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  id: string;
}
