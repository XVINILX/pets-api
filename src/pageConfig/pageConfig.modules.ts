import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { EnterpriseController } from './controller/pageConfig.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { PaginationEnterpriseHandler } from './domain/query/pagination-enterprise.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { PageConfigService } from './pageConfig.service';
import { PageConfigEntity } from 'src/entities/page-config.entity';
import { CreatePageConfigHandler } from './domain/command/create-page-config.handler';
import { DeletePageConfigHandler } from './domain/command/delete-page-config.handler';
import { PatchPageConfigHandler } from './domain/command/patch-page-config.handler';
import { FileEntity } from 'src/entities/file.entity';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';

const CommandHandler = [
  CreatePageConfigHandler,
  DeletePageConfigHandler,
  PatchPageConfigHandler,
];

const QueryHandler = [PaginationEnterpriseHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([PageConfigEntity, FileEntity, EnterpriseEntity]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [EnterpriseController],
  providers: [PageConfigService, ...CommandHandler, ...QueryHandler],
  exports: [PageConfigService],
})
export class PageConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'pageConfig/id:id', method: RequestMethod.ALL });
  }
}
