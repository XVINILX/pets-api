import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';
import { GetAnimalBySlugCommand } from './find-by-slug-animals.query';

@QueryHandler(GetAnimalBySlugCommand)
export class GetAnimalBySlugHandler
  implements IQueryHandler<GetAnimalBySlugCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: GetAnimalBySlugCommand) {
    try {
      const { slug } = command;

      const enteprise = await this.repository.findAnimalBySlug(slug);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
