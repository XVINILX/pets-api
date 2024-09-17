import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateAnswerCommand } from './create-answer.command';
import { AnswerConfigService } from 'src/answerConfig/answerConfig.service';

@CommandHandler(CreateAnswerCommand)
export class CreateAnswersHandler
  implements ICommandHandler<CreateAnswerCommand>
{
  constructor(private repository: AnswerConfigService) {}

  async execute(command: CreateAnswerCommand) {
    try {
      const { createAnswerDto, user } = command;
      const enteprise = await this.repository.createAnswer(
        createAnswerDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
