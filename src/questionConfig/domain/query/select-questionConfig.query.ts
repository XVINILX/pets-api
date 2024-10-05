import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';

/**
 * @param search string - Search by enterprise name
 * @param page number - Number of pagination
 * @param items number - Quantity of items in that page
 */
export class SelectPageConfigQuery {
  constructor(public readonly user: AuthJwtDto) {}
}
