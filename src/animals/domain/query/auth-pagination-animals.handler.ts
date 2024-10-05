import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';
import { AuthPaginationAnimalsQuery } from './auth-pagination-animals.query';

@QueryHandler(AuthPaginationAnimalsQuery)
export class AuthPaginationAnimalsHandler
  implements IQueryHandler<AuthPaginationAnimalsQuery>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: AuthPaginationAnimalsQuery) {
    try {
      const { search, items, page, user } = command;
      const enteprise = await this.repository.authListAnimalSearch(
        search,
        user,
        items,
        page,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
