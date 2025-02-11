import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Bitcoin } from './bitcoin.entity';
import { DataSource, Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Bitcoin)
    private bitcoinRepo: Repository<Bitcoin>,

    private dataSource: DataSource
  ) {}

  @Get()
  async getHello() {

    const hi = await this.dataSource.query(`
      WITH stats AS (
        SELECT
            bucket,
            stats_agg(block_weight, block_fee_sat) AS block_stats
        FROM one_hour_blocks
        WHERE bucket > date_add('2023-11-22 00:00:00+00', INTERVAL '-5 days')
        GROUP BY bucket
      )
      SELECT
        bucket as "time",
        average_y(rolling(block_stats) OVER (ORDER BY bucket RANGE '12 hours' PRECEDING)) AS "block weight",
        average_x(rolling(block_stats) OVER (ORDER BY bucket RANGE '12 hours' PRECEDING))*0.00000001 AS "mining fee"
      FROM stats
      ORDER BY 1;
    `);

    console.log(hi.length)

    return hi
  }

  @Get('test')
  async test() {

    const hi = await this.dataSource.query(`
      SELECT
        bucket as "time",
        average_y(rolling(stats_miner_revenue) OVER (ORDER BY bucket RANGE '12 hours' PRECEDING))*0.00000001 AS "revenue in BTC",
          average_x(rolling(stats_miner_revenue) OVER (ORDER BY bucket RANGE '12 hours' PRECEDING)) AS "revenue in USD"
      FROM one_hour_coinbase
      WHERE bucket > date_add('2023-11-22 00:00:00+00', INTERVAL '-5 days')
      ORDER BY 1;
    `);

    console.log(hi.length)

    return hi
  }
}
