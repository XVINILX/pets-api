import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePageConfigDto } from '../domain/dtos/create-page-config.dto';

import { DeleteEnterpriseDto } from '../domain/dtos/delete-page-config.dto';

import { ListEnterpriseDto } from '../domain/dtos/list-page-config.dto';
import { PaginationEnterpriseQuery } from '../domain/query/pagination-enterprise.query';
import { AuthGuard } from 'src/core/guards/auth.guards';
import { User } from 'src/core/decorators/user.decorators';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { DeleteEnterpriseCommand } from 'src/enterprise/domain/command/delete-enteprise.command';
import { ReadPageConfigDto } from '../domain/dtos/read-page-config.dto';
import { CreatePageConfigCommand } from '../domain/command/create-page-config.command';
import { PatchPageConfigCommand } from '../domain/command/patch-page-config.command';
import { UpdatePageConfigDto } from '../domain/dtos/update-page-config.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt')
@ControllerApp('pageConfig', 'PageConfig')
export class EnterpriseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({
    description: 'Creates an Enterprise',
    type: ReadPageConfigDto,
  })
  async create(
    @Body() enterpriseDto: CreatePageConfigDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreatePageConfigCommand(enterpriseDto, user),
    );
  }

  @Get('items=:items/page=:page/search=:search')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListEnterpriseDto,
  })
  async ListWithPagination(
    @Param('search') search: string,
    @Param('page') page: number,
    @Param('items') items: number,
  ) {
    return this.queryBus.execute(
      new PaginationEnterpriseQuery(search, page, items),
    );
  }

  @Patch(':id/')
  @ApiResponse({
    description: 'Update an Enterprise',
    type: ReadPageConfigDto,
  })
  async updateByCompleted(
    @Body() patchEnterprise: UpdatePageConfigDto,
    @User() user: AuthJwtDto,
    @Param('id') id: string,
  ) {
    return this.commandBus.execute(
      new PatchPageConfigCommand(patchEnterprise, id, user),
    );
  }

  @ApiResponse({
    description: 'Delete an Enterprise',
    type: DeleteEnterpriseDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteEnterpriseCommand(id));
  }
}
