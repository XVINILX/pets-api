import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { QuestionType } from '../enums/questions.enum';

export class CreateQuestionDto {
  @ApiProperty({ required: true })
  @IsString()
  public question: string;

  @ApiProperty({ required: true })
  @IsString()
  public type: QuestionType;

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
  public questionnairyConfigId?: string;
}

export class UpdateQuestionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public question?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public type?: string;

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
  public questionnairyConfigId?: string;
}
