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
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetAnimalByIdCommand } from '../domain/query/find-by-id-animals.query';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { AuthGuard } from 'src/core/guards/auth.guards';
import { ReadAnimalDto } from '../domain/dtos/read-animals.dto';
import { UpdateAnimalDto } from '../domain/dtos/update-animals.dto';
import { ListAnimalsDto } from '../domain/dtos/list-animals.dto';
import { CreateAnimalDto } from '../domain/dtos/create-animals.dto';
import { CreateAnimalsCommand } from '../domain/command/create-animals.command';
import { PaginationAnimalsQuery } from '../domain/query/pagination-animals.query';
import { PatchAnimalCommand } from '../domain/command/patch-animals.command';
import { DeleteAnimalsCommand } from '../domain/command/delete-animals.command';
import { AnimalType } from 'src/entities/animals.enum';
import { RaceAnimalsQuery } from '../domain/query/race-animals.query';
import { BreedsListDto } from '../domain/dtos/breed-list.dto';
import { GetAnimalBySlugCommand } from '../domain/query/find-by-slug-animals.query';
import { User } from 'src/core/decorators/user.decorators';
import { AuthGetAnimalByIdQuery } from '../domain/query/auth-by-id-animals.query';
import { AuthPaginationAnimalsQuery } from '../domain/query/auth-pagination-animals.query';
import { PaginationAnimalsCompanyIdQuery } from '../domain/query/pagination-companyId-animals.query';

@ControllerApp('animals', 'Animals')
export class EnterpriseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Post()
  @ApiResponse({
    description: 'Creates an Animal',
    type: ReadAnimalDto,
  })
  async create(
    @Body() enterpriseDto: CreateAnimalDto,
    @User() user: AuthJwtDto,
  ) {
    return await this.commandBus.execute(
      new CreateAnimalsCommand(enterpriseDto, user),
    );
  }

  @Get('/id=:id')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ReadAnimalDto,
  })
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetAnimalByIdCommand(id));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Get('/auth/id=:id')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ReadAnimalDto,
  })
  async authFindById(@Param('id') id: string, @User() user: AuthJwtDto) {
    return this.queryBus.execute(new AuthGetAnimalByIdQuery(id, user));
  }

  @Get('/slug=:slug')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ReadAnimalDto,
  })
  async findBySlug(@Param('slug') slug: string) {
    return this.queryBus.execute(new GetAnimalBySlugCommand(slug));
  }

  @Get('type=:type')
  @ApiResponse({
    description: 'Searchs races by animal type',
    type: BreedsListDto,
  })
  @ApiParam({ name: 'type', enum: AnimalType })
  async listOfRaces(@Param('type') type: AnimalType) {
    return this.queryBus.execute(new RaceAnimalsQuery(type));
  }

  @Get('list')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListAnimalsDto,
  })
  async ListWithPagination(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('items') items: number,
  ) {
    return this.queryBus.execute(
      new PaginationAnimalsQuery(search, page, items),
    );
  }

  @Get('list-by-companyId')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListAnimalsDto,
  })
  async ListWithPaginationAndCompanyId(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('items') items: number,
    @Query('companyId') companyId: string,
  ) {
    return this.queryBus.execute(
      new PaginationAnimalsCompanyIdQuery(search, page, items, companyId),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Get('list/auth')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListAnimalsDto,
  })
  async ListWithPaginationAuth(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('items') items: number,
    @User() user: AuthJwtDto,
  ) {
    return this.queryBus.execute(
      new AuthPaginationAnimalsQuery(search, page, items, user),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Patch(':id/')
  @ApiResponse({
    description: 'Update an Enterprise',
    type: ReadAnimalDto,
  })
  async updateByCompleted(
    @Body() patchEnterprise: UpdateAnimalDto,
    @Param('id') id: string,
  ) {
    return await this.commandBus.execute(
      new PatchAnimalCommand(patchEnterprise, id),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @ApiResponse({
    description: 'Delete an Enterprise',
    type: ReadAnimalDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commandBus.execute(new DeleteAnimalsCommand(id));
  }
}
