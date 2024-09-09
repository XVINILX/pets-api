import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetAnimalByIdCommand } from '../domain/query/find-by-id-animals.query';

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

// @UseGuards(AuthGuard)
// @ApiBearerAuth('jwt')
@ControllerApp('animals', 'Animals')
export class EnterpriseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({
    description: 'Creates an Animal',
    type: ReadAnimalDto,
  })
  async create(@Body() enterpriseDto: CreateAnimalDto) {
    return await this.commandBus.execute(
      new CreateAnimalsCommand(enterpriseDto),
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

  @Get('type=:type')
  @ApiResponse({
    description: 'Searchs races by animal type',
    type: BreedsListDto,
  })
  @ApiParam({ name: 'type', enum: AnimalType })
  async listOfRaces(@Param('type') type: AnimalType) {
    return this.queryBus.execute(new RaceAnimalsQuery(type));
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

  @ApiResponse({
    description: 'Delete an Enterprise',
    type: ReadAnimalDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commandBus.execute(new DeleteAnimalsCommand(id));
  }
}
