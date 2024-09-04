import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { EnterpriseController } from './controller/animals.controller';
import { CreateAnimalsHandler } from './domain/command/create-animals.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import { PatchEnterpriseHandler } from './domain/command/patch-animals.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';
import { GetAnimalByIdHandler } from './domain/query/find-by-id-animals.handler';
import { ListAnimalsHandler } from './domain/query/list-animals.handler';
import { PaginationAnimalsHandler } from './domain/query/pagination-animals.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { AnimalsEntity } from 'src/entities/animals.entity';
import { AnimalsService } from './animals.service';

const CommandHandler = [
  CreateAnimalsHandler,
  DeleteEnterpriseHandler,
  PatchEnterpriseHandler,
];

const QueryHandler = [
  GetAnimalByIdHandler,
  ListAnimalsHandler,
  PaginationAnimalsHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([AnimalsEntity]), CqrsModule, AuthModule],
  controllers: [EnterpriseController],
  providers: [AnimalsService, ...CommandHandler, ...QueryHandler],
  exports: [AnimalsService],
})
export class AnimalsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'animals/id:id', method: RequestMethod.ALL });
  }
}
