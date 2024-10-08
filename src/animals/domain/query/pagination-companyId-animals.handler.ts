import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';
import { PaginationAnimalsCompanyIdQuery } from './pagination-companyId-animals.query';

@QueryHandler(PaginationAnimalsCompanyIdQuery)
export class PaginationAnimalsCompanyIdHandler
  implements IQueryHandler<PaginationAnimalsCompanyIdQuery>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: PaginationAnimalsCompanyIdQuery) {
    try {
      const { search, items, page, companyId } = command;
      const enteprise = await this.repository.listAnimalSearchByCompanyId(
        companyId,
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
