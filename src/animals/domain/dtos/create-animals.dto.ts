import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

export class ImageAnimalList {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  imageUuid: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  order: number;
}

export class CreateAnimalDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  race: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state: string;

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
  company?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  receiver?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  initialDateAtDonation?: Date;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty({ enum: AnimalGenders })
  @IsEnum(AnimalGenders)
  gender: AnimalGenders;

  @ApiProperty({ enum: AnimalType })
  @IsEnum(AnimalType)
  type: AnimalType;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  castrated: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specialTreatment?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  healthHistory?: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  principalPictureUuid?: string;

  @ApiProperty({ type: [ImageAnimalList], required: false })
  @IsArray()
  @IsOptional()
  imagesList?: ImageAnimalList[];

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  adoptedAt?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty()
  @IsBoolean()
  activate: boolean;
}
