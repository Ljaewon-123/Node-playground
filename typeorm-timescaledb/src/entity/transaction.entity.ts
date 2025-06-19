import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { Hypertable, TimeColumn } from '@timescaledb/typeorm';

@Entity('transactions')
@Hypertable({
  compression: {
    compress: true,
    compress_orderby: 'time DESC',
    compress_segmentby: 'block_id',
    policy: {
      schedule_interval: '7 days',
      compress_after: '1 day',
    },
  },
  retention: {
    drop_after: '1 year',
  },
})
@Index('hash_idx', ['hash'])
@Index('block_idx', ['block_id'])
@Index('time_hash_idx', ['time', 'hash'], { unique: true })
export class Transactions {
  @TimeColumn()
  time: Date;

  @PrimaryColumn({ type: 'int', nullable: false })
  block_id: number;

  @PrimaryColumn({ type: 'text', nullable: false })
  hash: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'boolean' })
  is_coinbase: boolean;

  @Column({ type: 'bigint' })
  output_total: string;

  @Column({ type: 'double precision' })
  output_total_usd: number;

  @Column({ type: 'bigint' })
  fee: string;

  @Column({ type: 'double precision' })
  fee_usd: number;

  @Column({ type: 'jsonb' })
  details: any;
}