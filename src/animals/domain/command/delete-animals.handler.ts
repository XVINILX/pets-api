import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { DeleteAnimalsCommand } from './delete-animals.command';
import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(DeleteAnimalsCommand)
export class DeleteEnterpriseHandler
  implements ICommandHandler<DeleteAnimalsCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: DeleteAnimalsCommand) {
    try {
      const { id } = command;
      const enteprise = await this.repository.deleteUser(id);

      return { success: enteprise };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
