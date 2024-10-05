import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { QuestionConfigService } from 'src/questionConfig/questionConfig.service';
import { SelectPageConfigQuery } from './select-questionConfig.query';

@QueryHandler(SelectPageConfigQuery)
export class SelectAnimalsHandler
  implements IQueryHandler<SelectPageConfigQuery>
{
  constructor(private repository: QuestionConfigService) {}

  async execute(command: SelectPageConfigQuery) {
    try {
      const { user } = command;
      const enteprise = await this.repository.selectPageConfig(user);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
