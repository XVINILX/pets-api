import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateEnterpriseCommand } from '../domain/command/create-enteprise.command';

import { PatchEnterpriseCommand } from '../domain/command/patch-enteprise.command';
import { DeleteEnterpriseCommand } from '../domain/command/delete-enteprise.command';

import { DeleteEnterpriseDto } from '../domain/dtos/delete-enterprise.dto';
import { GetEnterpriseByIdQuery } from '../domain/query/find-by-id-enterprise.query';

import { PaginationEnterpriseQuery } from '../domain/query/pagination-enterprise.query';
import { AuthGuard } from 'src/core/guards/auth.guards';
import { User } from 'src/core/decorators/user.decorators';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { ReadEnterpriseDto } from '../domain/dtos/read-enterprise.dto';
import { CreateEnterpriseDto } from '../domain/dtos/create-enterprise.dto';
import { ListEnterpriseDto } from 'src/pageConfig/domain/dtos/list-page-config.dto';
import { UpdateEnterpriseDto } from '../domain/dtos/update-enterprise.dto';
import { GetEnterpriseBySlugQuery } from '../domain/query/find-by-slug-enterprise.query';

@ControllerApp('enterprise', 'Enterprise')
export class EnterpriseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Post()
  @ApiResponse({
    description: 'Creates an Enterprise',
    type: ReadEnterpriseDto,
  })
  async create(
    @Body() enterpriseDto: CreateEnterpriseDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateEnterpriseCommand(enterpriseDto, user),
    );
  }

  @Get('/id=:id')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ReadEnterpriseDto,
  })
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetEnterpriseByIdQuery(id));
  }

  @Get('/')
  @ApiResponse({
    description: 'Searchs an Enterprise By slug',
    type: ReadEnterpriseDto,
  })
  async findBySlug(@Query('slug') slug: string) {
    return this.queryBus.execute(new GetEnterpriseBySlugQuery(slug));
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Patch(':id/')
  @ApiResponse({
    description: 'Update an Enterprise',
    type: ReadEnterpriseDto,
  })
  async updateByCompleted(
    @Body() patchEnterprise: UpdateEnterpriseDto,
    @Param('id') id: string,
  ) {
    return this.commandBus.execute(
      new PatchEnterpriseCommand(patchEnterprise, id),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @ApiResponse({
    description: 'Delete an Enterprise',
    type: DeleteEnterpriseDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteEnterpriseCommand(id));
  }
}
