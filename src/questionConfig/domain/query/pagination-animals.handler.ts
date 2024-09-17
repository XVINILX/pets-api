import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationAnimalsQuery } from './pagination-animals.query';
import { AnimalsService } from 'src/animals/animals.service';

@QueryHandler(PaginationAnimalsQuery)
export class PaginationAnimalsHandler
  implements IQueryHandler<PaginationAnimalsQuery>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: PaginationAnimalsQuery) {
    try {
      const { search, items, page } = command;
      const enteprise = await this.repository.listEnterprise(
        search,
        items,
        page,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
