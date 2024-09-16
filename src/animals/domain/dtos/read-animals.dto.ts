import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { AnimalGenders, AnimalType } from 'src/entities/animals.enum';

export class ReadAnimalDto {
  @ApiProperty()
  @IsUUID()
  id: string;

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
  initialDateAtDonation?: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiProperty({ enum: AnimalGenders })
  @IsEnum(AnimalGenders)
  @IsOptional()
  gender: AnimalGenders;

  @ApiProperty({ enum: AnimalType })
  @IsEnum(AnimalType)
  @IsOptional()
  type: AnimalType;

  @ApiProperty()
  @IsBoolean()
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

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  listOfPictures?: string[];

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
