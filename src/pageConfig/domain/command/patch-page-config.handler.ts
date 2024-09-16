import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { PageConfigService } from 'src/pageConfig/pageConfig.service';
import { PatchPageConfigCommand } from './patch-page-config.command';

@CommandHandler(PatchPageConfigCommand)
export class PatchPageConfigHandler
  implements ICommandHandler<PatchPageConfigCommand>
{
  constructor(private repository: PageConfigService) {}

  async execute(command: PatchPageConfigCommand) {
    try {
      const { patchPageConfigDto, id, user } = command;
      const enteprise = await this.repository.patchPageConfig(
        patchPageConfigDto,
        user,
        id,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
