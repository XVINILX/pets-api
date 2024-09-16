import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEnterpriseCommand } from './create-enteprise.command';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@CommandHandler(CreateEnterpriseCommand)
export class CreateEnterpriseHandler
  implements ICommandHandler<CreateEnterpriseCommand>
{
  constructor(private repository: EnterpriseService) {}

  async execute(command: CreateEnterpriseCommand) {
    try {
      const { createEnterpriseDto, user } = command;
      const enteprise = await this.repository.createEnterprise(
        createEnterpriseDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
