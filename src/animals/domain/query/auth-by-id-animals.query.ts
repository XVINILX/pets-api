import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';

/**
 * @param search string - Search by enterprise name
 */
export class AuthGetAnimalByIdQuery {
  constructor(
    public readonly id: string,
    public readonly user: AuthJwtDto,
  ) {}
}
