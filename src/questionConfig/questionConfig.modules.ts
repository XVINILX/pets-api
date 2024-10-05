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

import { PaginationAnimalsHandler } from './domain/query/pagination-questionConfig.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { AnimalsEntity } from 'src/entities/animals.entity';
import { QuestionConfigService } from './questionConfig.service';
import { UserEntity } from 'src/entities/user.entity';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { FileEntity } from 'src/entities/file.entity';

import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';
import { CreateQuestionConfigHandler } from './domain/command/create-question-config.handler';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuestionnairyConfigEntity } from 'src/entities/questionnairyConfig.entity';

const CommandHandler = [CreateAnswersHandler, CreateQuestionConfigHandler];

const QueryHandler = [PaginationAnimalsHandler];

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
