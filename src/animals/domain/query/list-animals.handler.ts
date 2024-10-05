import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ListAnimalsQuery } from './list-animals.query';

import { AnimalsService } from 'src/animals/animals.service';

@QueryHandler(ListAnimalsQuery)
export class ListAnimalsHandler implements IQueryHandler<ListAnimalsQuery> {
  constructor(private repository: AnimalsService) {}

  async execute(command: ListAnimalsQuery) {
    try {
      const { search } = command;

      const enteprise = await this.repository.listAnimalSearch(search);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
