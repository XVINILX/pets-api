import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { CreateAnswerConfigDto } from '../dtos/create-answer-config.dto';

export class CreateAnswerConfigCommand {
  constructor(
    public readonly createAnswerDto: CreateAnswerConfigDto,
    public readonly user: AuthJwtDto,
  ) {}
}
