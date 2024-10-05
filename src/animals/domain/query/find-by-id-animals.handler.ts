import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetAnimalByIdCommand } from './find-by-id-animals.query';
import { AnimalsService } from 'src/animals/animals.service';

@QueryHandler(GetAnimalByIdCommand)
export class GetAnimalByIdHandler
  implements IQueryHandler<GetAnimalByIdCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: GetAnimalByIdCommand) {
    try {
      const { id } = command;

      const enteprise = await this.repository.findAnimal(id);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
