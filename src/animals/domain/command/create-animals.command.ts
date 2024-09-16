import { CreateAnimalDto } from '../dtos/create-animals.dto';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
export class CreateAnimalsCommand {
  constructor(
    public readonly createAnimalsDto: CreateAnimalDto,
    public readonly user: AuthJwtDto,
  ) {}
}
