import { ViewColumn, ViewEntity } from 'typeorm';
import { DataSource } from 'typeorm';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("time_bucket('1 hour', time)", 'bucket')
      .addSelect("count(*)", 'tx_count')
      .addSelect("stats_agg(output_total, output_total_usd)", 'stats_miner_revenue')
      .addSelect("min(output_total)", 'min_miner_revenue')
      .addSelect("max(output_total)", 'max_miner_revenue')
      .from('bitcoin', 'bitcoin')
      .where('bitcoin.is_coinbase IS TRUE')
      .groupBy('bucket')
})
export class OneHourCoinbase1 {
  @ViewColumn()
  bucket: Date;

  @ViewColumn()
  tx_count: number;

  @ViewColumn()
  stats_miner_revenue: number;

  @ViewColumn()
  min_miner_revenue: number;

  @ViewColumn()
  max_miner_revenue: number;
}




// SELECT * FROM pg_matviews WHERE matviewname = 'one_hour_coinbase';
// 👉 결과가 없으면 일반 VIEW로 등록됨
// 👉 만약 있으면 MATERIALIZED VIEW로 만들어졌지만 PostgreSQL이 \dv 명령어에서 pg_views를 기준