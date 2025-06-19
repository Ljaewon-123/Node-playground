// import {
//   ContinuousAggregate,
//   BucketColumn,
//   AggregateColumn,
// } from '@timescaledb/typeorm';
// import { Transactions } from 'src/entity/transaction.entity';
// import { PrimaryColumn } from 'typeorm';
// import { AggregateType } from '../timescale-type';

// // stats_agg 구현이 안되어있음 

// @ContinuousAggregate(Transactions, {
//   name: 'one_hour_blocks',
//   bucket_interval: '1 hour',
//   materialized_only: true,
//   refresh_policy: {
//     start_offset: '3 hours',
//     end_offset: '1 hour',
//     schedule_interval: '1 hour',
//   },
//   where: 'is_coinbase IS NOT TRUE',
// })
// export class OneHourBlocks {
//   @BucketColumn({ source_column: 'time' })
//   bucket: Date;

//   @PrimaryColumn()
//   block_id: string;

//   @AggregateColumn({ type: AggregateType.Count })
//   tx_count: number;

//   @AggregateColumn({ type: AggregateType.Sum, column: 'fee' })
//   block_fee_sat: number;

//   @AggregateColumn({ type: AggregateType.Sum, column: 'fee_usd' })
//   block_fee_usd: number;

//   @AggregateColumn({ type: stats_agg() , column: 'fee' })
//   stats_tx_fee_sat: any;

//   @AggregateColumn({ type: AggregateType.Avg, column: 'size' })
//   avg_tx_size: number;

//   @AggregateColumn({ type: AggregateType.Avg, column: 'weight' })
//   avg_tx_weight: number;

//   @AggregateColumn({ type: AggregateType.Sum, column: 'size' })
//   block_size: number;

//   @AggregateColumn({ type: AggregateType.Sum, column: 'weight' })
//   block_weight: number;

//   @AggregateColumn({ type: AggregateType.Max, column: 'size' })
//   max_tx_size: number;

//   @AggregateColumn({ type: AggregateType.Max, column: 'weight' })
//   max_tx_weight: number;

//   @AggregateColumn({ type: AggregateType.Min, column: 'size' })
//   min_tx_size: number;

//   @AggregateColumn({ type: AggregateType.Min, column: 'weight' })
//   min_tx_weight: number;
// }
