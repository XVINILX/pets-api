import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAnimalsCommand } from './create-animals.command';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(CreateAnimalsCommand)
export class CreateAnimalsHandler
  implements ICommandHandler<CreateAnimalsCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: CreateAnimalsCommand) {
    try {
      const { createAnimalsDto, user } = command;
      const enteprise = await this.repository.createEnterprise(
        createAnimalsDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
