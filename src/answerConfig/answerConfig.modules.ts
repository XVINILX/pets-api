import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { AnswerConfigController } from './controller/answerConfig.controller';
import { CreateAnswersHandler } from './domain/command/create-answer.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';

import { AuthModule } from 'src/core/auth/auth.module';
import { AnimalsEntity } from 'src/entities/animals.entity';
import { AnswerConfigService } from './answerConfig.service';
import { UserEntity } from 'src/entities/user.entity';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { FileEntity } from 'src/entities/file.entity';

import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';
import { AnswerEntity } from 'src/entities/answer.entity';
import { GetAnswerConfigByIdHandler } from './domain/query/find-by-id-answerConfig.handler';

const CommandHandler = [CreateAnswersHandler, DeleteEnterpriseHandler];

const QueryHandler = [GetAnswerConfigByIdHandler];

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
