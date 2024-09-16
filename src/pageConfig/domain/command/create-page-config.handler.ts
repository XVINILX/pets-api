import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { PageConfigService } from 'src/pageConfig/pageConfig.service';
import { CreatePageConfigCommand } from './create-page-config.command';

@CommandHandler(CreatePageConfigCommand)
export class CreatePageConfigHandler
  implements ICommandHandler<CreatePageConfigCommand>
{
  constructor(private repository: PageConfigService) {}

  async execute(command: CreatePageConfigCommand) {
    try {
      const { createPageConfigDto, user } = command;
      const enteprise = await this.repository.createPageConfig(
        createPageConfigDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
