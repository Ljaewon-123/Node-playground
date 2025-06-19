import { Controller, Get } from '@nestjs/common';
import { IotService } from './iot.service';

@Controller('iot')
export class IotController {
  constructor(
    private iotService: IotService
  ){}

  @Get('sensor-avg-by-30m')
  async getAvgSensorDataBy30Min() {
    const result = await this.iotService.getAvgSensorDataBy30Min()
    // result[0].
    return result
  }

  @Get('sensor-avg-last-temp-30m')
  async getAvgLastTemp30MWithCPU() {
    return await this.iotService.getAvgLastTemp30MWithCPU()
  }

  @Get('meta')
  async getMeata() {
    return await this.iotService.getMetadata()
  }
}
