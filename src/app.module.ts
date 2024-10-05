import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './user/user.modules';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from './enterprise/enterprise.modules';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AnimalsModule } from './animals/animals.modules';
import { PageConfigModule } from './pageConfig/pageConfig.modules';
import { FilesModule } from './files/files.modules';
import { AnimalsEntity } from './entities/animals.entity';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { FileEntity } from './entities/file.entity';
import { PageConfigEntity } from './entities/page-config.entity';
import { UserEntity } from './entities/user.entity';
import { AnswerConfigEntity } from './entities/answerConfig.entity';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';
import { QuestionnairyConfigEntity } from './entities/questionnairyConfig.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AnimalsModule,
    EnterpriseModule,
    PageConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [
        AnimalsEntity,
        EnterpriseEntity,
        PageConfigEntity,
        UserEntity,
        FileEntity,
        AnswerConfigEntity,
        AnswerEntity,
        QuestionEntity,
        QuestionnairyConfigEntity,
      ],
      synchronize: true,
      extra: { ssl: { rejectUnauthorized: false } },
      ssl: true,
    }),

    FilesModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
