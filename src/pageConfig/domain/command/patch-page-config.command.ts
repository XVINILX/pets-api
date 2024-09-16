import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { UpdatePageConfigDto } from '../dtos/update-page-config.dto';

export class PatchPageConfigCommand {
  constructor(
    public readonly patchPageConfigDto: UpdatePageConfigDto,
    public readonly id: string,
    public readonly user: AuthJwtDto,
  ) {}
}
