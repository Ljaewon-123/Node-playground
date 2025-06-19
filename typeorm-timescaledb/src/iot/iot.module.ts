import { Module } from '@nestjs/common';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from 'src/entity/sensor-data.entity';
import { Sensors } from 'src/entity/sensors.entity';
import { IotRepository } from './repository/iot.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorData, Sensors]),
  ],
  controllers: [IotController],
  providers: [IotService, IotRepository]
})
export class IotModule {}
