import { Injectable } from '@nestjs/common';
import { IotRepository } from './repository/iot.repository';

@Injectable()
export class IotService {
  constructor(
    private readonly iotRepository: IotRepository
  ){}

  async getAvgSensorDataBy30Min() {
    return this.iotRepository.getAvgSensorDataBy30Min()
  }

  async getAvgLastTemp30MWithCPU() {
    return this.iotRepository.getAvgLastTemp30MWithCPU()
  }

  async getMetadata(){
    return this.iotRepository.getMetadata()
  }
}
