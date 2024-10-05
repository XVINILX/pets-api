import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';
import { AuthGetAnimalByIdQuery } from './auth-by-id-animals.query';

@QueryHandler(AuthGetAnimalByIdQuery)
export class AuthGetAnimalByIdHandler
  implements IQueryHandler<AuthGetAnimalByIdQuery>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: AuthGetAnimalByIdQuery) {
    try {
      const { id, user } = command;

      const enteprise = await this.repository.authFindAnimal(id, user);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
