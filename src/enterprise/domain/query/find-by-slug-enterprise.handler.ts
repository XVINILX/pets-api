import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { GetEnterpriseBySlugQuery } from './find-by-slug-enterprise.query';

@QueryHandler(GetEnterpriseBySlugQuery)
export class GetEnterpriseBySlugHandler
  implements IQueryHandler<GetEnterpriseBySlugQuery>
{
  constructor(private repository: EnterpriseService) {}

  async execute(command: GetEnterpriseBySlugQuery) {
    try {
      const { slug } = command;

      const enteprise = await this.repository.findEnterpriseBySlug(slug);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
