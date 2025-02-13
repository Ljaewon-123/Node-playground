import { ViewColumn, ViewEntity } from 'typeorm';
import { DataSource } from 'typeorm';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("time_bucket('1 hour', time)", 'bucket')
      .addSelect("count(*)", 'tx_count')
      .addSelect("sum(fee)", 'total_fee_sat')
      .addSelect("sum(fee_usd)", 'total_fee_usd')
      .addSelect("stats_agg(fee)", 'stats_fee_sat')
      .addSelect("avg(size)", 'avg_tx_size')
      .addSelect("avg(weight)", 'avg_tx_weight')
      .addSelect("count(CASE WHEN (fee > output_total) THEN hash ELSE NULL END)", 'high_fee_count')
      .from('bitcoin', 'bitcoin')
      .where('bitcoin.is_coinbase IS NOT TRUE')
      .groupBy('bucket')
})
export class OneHourTransactions1 {
  @ViewColumn()
  bucket: Date;

  @ViewColumn()
  tx_count: number;

  @ViewColumn()
  total_fee_sat: number;

  @ViewColumn()
  total_fee_usd: number;

  @ViewColumn()
  stats_fee_sat: number;

  @ViewColumn()
  avg_tx_size: number;

  @ViewColumn()
  avg_tx_weight: number;

  @ViewColumn()
  high_fee_count: number;
}
