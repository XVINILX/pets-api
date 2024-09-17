import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { AnswerEntity } from 'src/entities/answer.entity';

export class CreateAnswerConfigDto {
  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public animalId?: string;

  @ApiProperty({ type: [AnswerEntity], required: false })
  @IsArray()
  @IsOptional()
  public answers?: AnswerEntity[];
}

export class UpdateAnswerConfigDto {
  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public animalId?: string;

  @ApiProperty({ type: [AnswerEntity], required: false })
  @IsArray()
  @IsOptional()
  public answers?: AnswerEntity[];
}
