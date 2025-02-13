import { BeforeApplicationShutdown, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Bitcoin } from './bitcoin.entity';
import { connectDataSource, coinbaseView, blockView, disconnectDataSource, transaction1View, dataSource } from './connection/data-source';
// import { createMaterializedView } from './connection/data-source';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'tutorials',
      entities: [User, Bitcoin],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Bitcoin]),
    DatasourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}