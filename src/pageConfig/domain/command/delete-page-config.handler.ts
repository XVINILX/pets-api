import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { DeletePageConfigCommand } from './delete-page-config.command';

import { PageConfigService } from 'src/pageConfig/pageConfig.service';

@CommandHandler(DeletePageConfigCommand)
export class DeletePageConfigHandler
  implements ICommandHandler<DeletePageConfigCommand>
{
  constructor(private repository: PageConfigService) {}

  async execute(command: DeletePageConfigCommand) {
    try {
      const { id } = command;
      const enteprise = await this.repository.deleteUser(id);

      return { success: enteprise };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
