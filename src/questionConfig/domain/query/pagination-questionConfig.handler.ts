import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationPageConfigQuery } from './pagination-questionConfig.query';
import { QuestionConfigService } from 'src/questionConfig/questionConfig.service';

@QueryHandler(PaginationPageConfigQuery)
export class PaginationAnimalsHandler
  implements IQueryHandler<PaginationPageConfigQuery>
{
  constructor(private repository: QuestionConfigService) {}

  async execute(command: PaginationPageConfigQuery) {
    try {
      const { search, items, page } = command;
      const enteprise = await this.repository.listPageConfig(
        search,
        items,
        page,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
