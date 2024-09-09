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
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: process.env.MONGO_HOST,
    //   port: parseInt(process.env.MONGO_PORT),
    //   database: process.env.MONGO_DB,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   entities: [FileEntity],
    //   synchronize: true,
    // }),
    FilesModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
