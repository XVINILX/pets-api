import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AnimalGenders, AnimalType } from 'src/entities/animals.enum';

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

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zipCode: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  receiver?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  initialDateAtDonation?: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ required: false, enum: AnimalGenders })
  @IsEnum(AnimalGenders)
  @IsOptional()
  gender?: AnimalGenders;

  @ApiProperty({ enum: AnimalType })
  @IsEnum(AnimalType)
  type: AnimalType;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  castrated?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specialTreatment?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  healthHistory?: string;

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
  imagesList?: string[];

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
