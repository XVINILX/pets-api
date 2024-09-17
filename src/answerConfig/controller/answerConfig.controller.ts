import { Body, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { AuthGuard } from 'src/core/guards/auth.guards';
import { ReadAnimalDto } from '../domain/dtos/read-animals.dto';

import { ListAnimalsDto } from '../domain/dtos/list-animals.dto';
import { PaginationAnimalsQuery } from '../domain/query/pagination-animals.query';

import { DeleteAnimalsCommand } from '../domain/command/delete-animals.command';

import { User } from 'src/core/decorators/user.decorators';
import { CreateAnswerDto } from '../domain/dtos/create-answer.dto';
import { CreateAnswerCommand } from '../domain/command/create-answer.command';
import { CreateAnswerConfigCommand } from '../domain/command/create-answer-config.command';
import { CreateAnswerConfigDto } from '../domain/dtos/create-answer-config.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt')
@ControllerApp('answerConfig', 'AnwerConfig')
export class AnswerConfigController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/answer')
  @ApiResponse({
    description: 'Creates an answer',
    type: CreateAnswerDto,
  })
  async create(
    @Body() enterpriseDto: CreateAnswerDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateAnswerCommand(enterpriseDto, user),
    );
  }

  @Post('/')
  @ApiResponse({
    description: 'Creates an answer config',
    type: CreateAnswerDto,
  })
  async createPageConfig(
    @Body() enterpriseDto: CreateAnswerConfigDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateAnswerConfigCommand(enterpriseDto, user),
    );
  }

  @Get('items=:items/page=:page/search=:search')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListAnimalsDto,
  })
  async ListWithPagination(
    @Param('search') search: string,
    @Param('page') page: number,
    @Param('items') items: number,
  ) {
    return this.queryBus.execute(
      new PaginationAnimalsQuery(search, page, items),
    );
  }

  @ApiResponse({
    description: 'Delete an Enterprise',
    type: ReadAnimalDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commandBus.execute(new DeleteAnimalsCommand(id));
  }
}
