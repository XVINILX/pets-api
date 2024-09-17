import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateQuestionCommand } from './create-question.command';

import { QuestionConfigService } from 'src/questionConfig/questionConfig.service';

@CommandHandler(CreateQuestionCommand)
export class CreateAnswersHandler
  implements ICommandHandler<CreateQuestionCommand>
{
  constructor(private repository: QuestionConfigService) {}

  async execute(command: CreateQuestionCommand) {
    try {
      const { createQuestionDto, user } = command;
      const enteprise = await this.repository.createQuestion(
        createQuestionDto,
        user,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
