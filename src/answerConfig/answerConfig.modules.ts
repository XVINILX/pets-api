import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import {
  AnswerConfigController,
  EnterpriseController,
} from './controller/answerConfig.controller';
import {
  CreateAnimalsHandler,
  CreateAnswersHandler,
} from './domain/command/create-answer.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import {
  PatchAnswerHandler,
  PatchEnterpriseHandler,
} from './domain/command/patch-answers.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';
import { GetAnimalByIdHandler } from './domain/query/find-by-id-animals.handler';
import { ListAnimalsHandler } from './domain/query/list-animals.handler';
import { PaginationAnimalsHandler } from './domain/query/pagination-animals.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { AnimalsEntity } from 'src/entities/animals.entity';
import { AnswerConfigService } from './answerConfig.service';
import { UserEntity } from 'src/entities/user.entity';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { FileEntity } from 'src/entities/file.entity';
import { RaceAnimalsHandler } from './domain/query/race-animals.handler';
import { GetAnimalBySlugHandler } from './domain/query/find-by-slug-animals.handler';
import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';
import { AnswerEntity } from 'src/entities/answer.entity';

const CommandHandler = [
  CreateAnswersHandler,
  DeleteEnterpriseHandler,
  PatchAnswerHandler,
];

const QueryHandler = [
  GetAnimalByIdHandler,
  ListAnimalsHandler,
  PaginationAnimalsHandler,
  GetAnimalBySlugHandler,
  RaceAnimalsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnimalsEntity,
      UserEntity,
      EnterpriseEntity,
      FileEntity,
      AnswerConfigEntity,
      AnswerEntity,
    ]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [AnswerConfigController],
  providers: [AnswerConfigService, ...CommandHandler, ...QueryHandler],
  exports: [AnswerConfigService],
})
export class AnimalsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'animals/id:id', method: RequestMethod.ALL });
  }
}
