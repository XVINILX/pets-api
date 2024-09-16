import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEnterpriseDto {
  @ApiProperty()
  @IsString()
  razaoSocial?: string;

  @ApiProperty()
  @IsString()
  nomeFantasia?: string;

  @ApiProperty()
  @IsString()
  cnpj?: string;

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

  @ApiProperty()
  openingDate?: Date;
}
