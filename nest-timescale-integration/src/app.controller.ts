import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Bitcoin } from './bitcoin.entity';
import { Repository } from 'typeorm';
import { dataSource } from './connection/data-source';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Bitcoin)
    private bitcoinRepo: Repository<Bitcoin>,
  ) {}

  @Get()
  async getHello() {
    await dataSource.initialize()

    const hi = await dataSource.query(`
      SELECT
        bucket AS "time",
        tx_count as "tx volume",
        average(stats_fee_sat) as fees
      FROM one_hour_transactions1
      WHERE bucket > date_add('2023-11-22 00:00:00+00', INTERVAL '-2 days')
      ORDER BY 1;
    `);

    console.log(hi.length)

    return hi
  }
}
