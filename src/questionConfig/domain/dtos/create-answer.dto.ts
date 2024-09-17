import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ required: true })
  @IsString()
  public question: string;

  @ApiProperty({ required: true })
  @IsString()
  public answer: string;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  public order?: number;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  public step?: number;

  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public answerConfigId?: string;
}

export class UpdateAnswerDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public question?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public answer?: string;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  public order?: number;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  public step?: number;

  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public answerConfigId?: string;
}
