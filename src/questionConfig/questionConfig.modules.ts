import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { QuestionConfigController } from './controller/questionConfig.controller';
import { CreateAnswersHandler } from './domain/command/create-question.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import { PatchAnswerHandler } from './domain/command/patch-answers.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';
import { GetAnimalByIdHandler } from './domain/query/find-by-id-animals.handler';
import { ListAnimalsHandler } from './domain/query/list-animals.handler';
import { PaginationAnimalsHandler } from './domain/query/pagination-animals.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { AnimalsEntity } from 'src/entities/animals.entity';
import { QuestionConfigService } from './questionConfig.service';
import { UserEntity } from 'src/entities/user.entity';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { FileEntity } from 'src/entities/file.entity';
import { RaceAnimalsHandler } from './domain/query/race-animals.handler';
import { GetAnimalBySlugHandler } from './domain/query/find-by-slug-animals.handler';
import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';
import { CreateQuestionConfigHandler } from './domain/command/create-question-config.handler';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuestionnairyConfigEntity } from 'src/entities/questionnairyConfig.entity';

const CommandHandler = [
  CreateAnswersHandler,
  DeleteEnterpriseHandler,
  PatchAnswerHandler,
  CreateQuestionConfigHandler,
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
      QuestionEntity,
      QuestionnairyConfigEntity,
    ]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [QuestionConfigController],
  providers: [QuestionConfigService, ...CommandHandler, ...QueryHandler],
  exports: [QuestionConfigService],
})
export class AnimalsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'animals/id:id', method: RequestMethod.ALL });
  }
}
