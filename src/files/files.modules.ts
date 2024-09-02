import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from 'src/core/auth/auth.module';

import { FileEntity } from 'src/entities/file.entity';
import { FilesService } from './files.service';
import { FileController } from './controller/files.controller';
import { S3Service } from './integration/aws.service';

const CommandHandler = [];

const QueryHandler = [];

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), CqrsModule, AuthModule],
  controllers: [FileController],
  providers: [FilesService, S3Service, ...CommandHandler, ...QueryHandler],
  exports: [FilesService],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'files/id:id', method: RequestMethod.ALL });
  }
}
