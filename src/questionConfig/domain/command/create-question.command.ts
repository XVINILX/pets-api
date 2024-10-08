import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { CreateQuestionDto } from '../dtos/create-question.dto';
export class CreateQuestionCommand {
  constructor(
    public readonly createQuestionDto: CreateQuestionDto,
    public readonly user: AuthJwtDto,
  ) {}
}
