import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { PatchAnimalCommand } from './patch-animals.command';
import { AnswerConfigService } from 'src/answerConfig/answerConfig.service';

@CommandHandler(PatchAnimalCommand)
export class PatchAnswerHandler implements ICommandHandler<PatchAnimalCommand> {
  constructor(private repository: AnswerConfigService) {}

  async execute(command: PatchAnimalCommand) {
    try {
      const { patchAnimalDto, id } = command;
      const enteprise = await this.repository.updateAnswerConfig(
        patchAnimalDto,
        id,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
