import { BeforeApplicationShutdown, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Bitcoin } from './bitcoin.entity';
import { connectClient, coinbaseView, blockView, disconnectClient, transaction1View, dataSource } from './connection/data-source';
// import { createMaterializedView } from './connection/data-source';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, BeforeApplicationShutdown {
  // onModuleInit에서 클라이언트 연결 및 뷰 생성
  async onModuleInit() {
    console.log(`The module has been initialized.`);

    await dataSource.initialize()

    await connectClient(); // 클라이언트 연결
    coinbaseView();
    transaction1View()
    blockView()
  }

  // beforeApplicationShutdown에서 연결 종료
  async beforeApplicationShutdown() {
    console.log('Application is shutting down, closing the client...');
    await disconnectClient(); // 연결 종료
  }
}