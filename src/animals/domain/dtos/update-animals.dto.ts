import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAnimalDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  race?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  zipCode?: string;

  // @ApiProperty({ required: false })
  // @IsUUID()
  // @IsOptional()
  // company?: string;

  // @ApiProperty({ required: false })
  // @IsUUID()
  // @IsOptional()
  // receiver?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  donatedAt?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  principalPictureUuid?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  listOfPictures?: string[];

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  adoptedAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  activate?: boolean;
}
