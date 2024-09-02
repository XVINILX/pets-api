import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  IsMimeType,
} from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ description: 'The URL of the file stored in S3' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'The original filename of the file' })
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'The size of the file in bytes',
    required: false,
  })
  @IsOptional()
  @IsInt()
  size?: number;

  @ApiProperty({ description: 'The MIME type of the file', required: false })
  @IsOptional()
  @IsMimeType()
  mimeType?: string;

  @ApiProperty({
    description: 'Optional description of the file',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The UUID of the associated animal entity' })
  @IsUUID()
  animalId?: string;
}
