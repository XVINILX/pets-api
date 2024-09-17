import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { AnswerConfigService } from 'src/answerConfig/answerConfig.service';
import { CreateQuestionConfigCommand } from './create-question-config.command';

@CommandHandler(CreateQuestionConfigCommand)
export class CreateQuestionConfigHandler
  implements ICommandHandler<CreateQuestionConfigCommand>
{
  constructor(private repository: AnswerConfigService) {}

  async execute(command: CreateQuestionConfigCommand) {
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
