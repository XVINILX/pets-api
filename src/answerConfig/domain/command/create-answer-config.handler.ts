import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { AnswerConfigService } from 'src/answerConfig/answerConfig.service';
import { CreateAnswerConfigCommand } from './create-answer-config.command';

@CommandHandler(CreateAnswerConfigCommand)
export class CreateAnswersHandler
  implements ICommandHandler<CreateAnswerConfigCommand>
{
  constructor(private repository: AnswerConfigService) {}

  async execute(command: CreateAnswerConfigCommand) {
    try {
      const { createAnswerDto, user } = command;
      const enteprise = await this.repository.createAnswerConfig(
        createAnswerDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
