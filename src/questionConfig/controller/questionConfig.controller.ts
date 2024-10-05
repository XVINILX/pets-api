import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { AuthGuard } from 'src/core/guards/auth.guards';

import { User } from 'src/core/decorators/user.decorators';
import { CreateAnswerDto } from '../domain/dtos/create-answer.dto';

import { CreateAnswerConfigDto } from '../domain/dtos/create-answer-config.dto';
import { CreateQuestionCommand } from '../domain/command/create-question.command';
import { CreateQuestionDto } from '../domain/dtos/create-question.dto';
import { CreateQuestionConfigCommand } from '../domain/command/create-question-config.command';
import { PaginationPageConfigQuery } from '../domain/query/pagination-questionConfig.query';
import { ListQuestionnairyConfigDto } from '../domain/dtos/create-questionnairy.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt')
@ControllerApp('questionConfig', 'QuestionConfig')
export class QuestionConfigController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/question')
  @ApiResponse({
    description: 'Creates an answer',
    type: CreateQuestionDto,
  })
  async create(
    @Body() enterpriseDto: CreateQuestionDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateQuestionCommand(enterpriseDto, user),
    );
  }

  @Get('items=:items/page=:page/search=:search')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListQuestionnairyConfigDto,
  })
  async ListWithPaginationSearch(
    @Param('page') page: number,
    @Param('items') items: number,
    @Param('search') search: string,
  ) {
    return this.queryBus.execute(
      new PaginationPageConfigQuery(search, page, items),
    );
  }

  @Post('/')
  @ApiResponse({
    description: 'Creates an question config',
    type: CreateAnswerDto,
  })
  async createPageConfig(
    @Body() enterpriseDto: CreateAnswerConfigDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateQuestionConfigCommand(enterpriseDto, user),
    );
  }
}
