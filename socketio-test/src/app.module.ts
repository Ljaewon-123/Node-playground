import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomGateway } from './room/room.gateway';
import { RoomModule } from './room/room.module';

@Module({
  imports: [RoomModule],
  controllers: [AppController],
  providers: [AppService, RoomGateway],
})
export class AppModule {}
