import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cat/cat.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
