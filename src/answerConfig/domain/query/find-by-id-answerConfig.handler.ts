import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetAnsweConfigByIdCommand } from './find-by-id-answerConfig.query';
import { AnimalsService } from 'src/animals/animals.service';
import { AnswerConfigService } from 'src/answerConfig/answerConfig.service';

@QueryHandler(GetAnsweConfigByIdCommand)
export class GetAnswerConfigByIdHandler
  implements IQueryHandler<GetAnsweConfigByIdCommand>
{
  constructor(private repository: AnswerConfigService) {}

  async execute(command: GetAnsweConfigByIdCommand) {
    try {
      const { id } = command;

      const answerConfig = await this.repository.findAnswerConfig(id);

      return answerConfig;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
