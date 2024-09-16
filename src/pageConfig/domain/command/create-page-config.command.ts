import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { CreatePageConfigDto } from '../dtos/create-page-config.dto';

export class CreatePageConfigCommand {
  constructor(
    public readonly createPageConfigDto: CreatePageConfigDto,
    public readonly user: AuthJwtDto,
  ) {}
}
