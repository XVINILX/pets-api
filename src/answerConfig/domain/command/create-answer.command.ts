import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
export class CreateAnswerCommand {
  constructor(
    public readonly createAnswerDto: CreateAnswerDto,
    public readonly user: AuthJwtDto,
  ) {}
}
