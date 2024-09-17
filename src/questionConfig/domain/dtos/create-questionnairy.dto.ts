import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { QuestionEntity } from 'src/entities/question.entity';

export class CreateQuestionnairyConfigDto {
  @ApiProperty({ required: true })
  @IsString()
  public type: string;

  @ApiProperty({ type: [QuestionEntity], required: false })
  @IsArray()
  @IsOptional()
  public questions?: QuestionEntity[];

  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public enterpriseId?: string;
}

export class UpdateQuestionnairyConfigDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public type?: string;

  @ApiProperty({ type: [QuestionEntity], required: false })
  @IsArray()
  @IsOptional()
  public questions?: QuestionEntity[];

  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  public enterpriseId?: string;
}
