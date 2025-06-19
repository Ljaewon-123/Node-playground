import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimescaleRepository } from '@timescaledb/typeorm';
import { plainToInstance } from 'class-transformer';
import { SensorData } from 'src/entity/sensor-data.entity';
import { Sensors } from 'src/entity/sensors.entity';
import { LastTempAvg, PeriodStatsDto } from './DTO/sensor-data';

@Injectable()
export class IotRepository {
  constructor(
    @InjectRepository(SensorData)
    private sensorDataRepository: TimescaleRepository<SensorData>,
    @InjectRepository(Sensors)
    private sensorRepository: TimescaleRepository<Sensors>,
  ){};

  // getTimeBucket는 정보가 너무 없어서 오히려 쓰기 불편하다.
  // timescale 전용함수는 쿼리빌더로 처리 

  async getAvgSensorDataBy30Min() {
    const data = await this.sensorDataRepository
      .createQueryBuilder('sensor_data')
      .select("time_bucket('30 minutes', sensor_data.time)", 'period')
      .addSelect('AVG(sensor_data.temperature)', 'avg_temp')
      .addSelect('AVG(sensor_data.cpu)', 'avg_cpu')
      .groupBy('period')
      .orderBy('period', 'ASC')
      .getRawMany<PeriodStatsDto>();

    return data  // 똑같은데?
    // return plainToInstance(PeriodStatsDto, data)
  }

  async getAvgLastTemp30MWithCPU(){
    const data = await this.sensorDataRepository
      .createQueryBuilder('sensor_data')
      .select("time_bucket('30 minutes', sensor_data.time)", 'period')
      .addSelect('AVG(sensor_data.temperature)', 'avg_temp')
      .addSelect('last(sensor_data.temperature, sensor_data.time)', 'last_temp')
      .addSelect('AVG(sensor_data.cpu)', 'avg_cpu')
      .groupBy('period')
      .getRawMany<LastTempAvg>();
    return data
  }

  async getMetadata() {
    return await this.sensorDataRepository
      .createQueryBuilder('sensor_data')
      .innerJoin('sensors', 'sensors', 'sensor_data.sensor_id = sensors.id')
      .select("sensors.location", "location")
      .addSelect("time_bucket('30 minutes', sensor_data.time)", "period")
      .addSelect("AVG(sensor_data.temperature)", "avg_temp")
      .addSelect("last(sensor_data.temperature, sensor_data.time)", "last_temp")
      .addSelect("AVG(sensor_data.cpu)", "avg_cpu")
      .groupBy("period")
      .addGroupBy("sensors.location")
      .orderBy("period", "ASC")
      .getRawMany();
  }


}
