import { ViewColumn, ViewEntity } from 'typeorm';
import { DataSource } from 'typeorm';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("time_bucket('1 hour', time)", 'bucket')
      .addSelect("block_id")
      .addSelect("count(*)", 'tx_count')
      .addSelect("sum(fee)", 'block_fee_sat')
      .addSelect("sum(fee_usd)", 'block_fee_usd')
      .addSelect("stats_agg(fee)", 'stats_tx_fee_sat')
      .addSelect("avg(size)", 'avg_tx_size')
      .addSelect("avg(weight)", 'avg_tx_weight')
      .addSelect("sum(size)", 'block_size')
      .addSelect("sum(weight)", 'block_weight')
      .addSelect("max(size)", 'max_tx_size')
      .addSelect("max(weight)", 'max_tx_weight')
      .addSelect("min(size)", 'min_tx_size')
      .addSelect("min(weight)", 'min_tx_weight')
      .from('bitcoin', 'bitcoin')
      .where('bitcoin.is_coinbase IS NOT TRUE')
      .groupBy('bucket, block_id')
})
export class OneHourBlocks1 {
  @ViewColumn()
  bucket: Date;

  @ViewColumn()
  block_id: number;

  @ViewColumn()
  tx_count: number;

  @ViewColumn()
  block_fee_sat: number;

  @ViewColumn()
  block_fee_usd: number;

  @ViewColumn()
  stats_tx_fee_sat: number;

  @ViewColumn()
  avg_tx_size: number;

  @ViewColumn()
  avg_tx_weight: number;

  @ViewColumn()
  block_size: number;

  @ViewColumn()
  block_weight: number;

  @ViewColumn()
  max_tx_size: number;

  @ViewColumn()
  max_tx_weight: number;

  @ViewColumn()
  min_tx_size: number;

  @ViewColumn()
  min_tx_weight: number;
}
