import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ReadAnimalDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  race: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsUUID()
  company: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  receiver?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  donatedAt?: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  principalPictureUuid: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  listOfPictures: string[];

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  adoptedAt?: Date;

  @ApiProperty()
  @IsDate()
  birthday: Date;

  @ApiProperty()
  @IsBoolean()
  activate: boolean;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
