import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { PatchAnimalCommand } from './patch-animals.command';
import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(PatchAnimalCommand)
export class PatchEnterpriseHandler
  implements ICommandHandler<PatchAnimalCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: PatchAnimalCommand) {
    try {
      const { patchAnimalDto, id } = command;
      const enteprise = await this.repository.patchEnterprise(
        patchAnimalDto,
        id,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
