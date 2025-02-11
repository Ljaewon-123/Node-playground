import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

// CREATE INDEX hash_idx ON bitcoin USING HASH (hash);
// CREATE INDEX block_idx ON bitcoin (block_id);
// CREATE UNIQUE INDEX time_hash_idx ON bitcoin (time, hash);

// CREATE UNIQUE INDEX idx_deviceid_time
//   ON hypertable_example(device_id, time);

// @Index('hash_idx', { synchronize: false })
// @Index('block_idx', ['block_id']) // B-TREE 인덱스 (기본값)
// @Index('time_hash_idx', ['time', 'hash'], { unique: true }) // 복합 유니크 인덱스
// @Index('time_block_idx', ['time', 'block_id'], { unique: true }) // 복합 유니크 인덱스
// @Index('time_idx', ['time'])
@Entity()
export class Bitcoin {
  @PrimaryColumn({ type: 'timestamptz', nullable: false })
  time: Date;

  @PrimaryColumn({ type: 'int', nullable: false })
  block_id: number;

  @PrimaryColumn({ type: 'text', nullable: false })
  hash: string;

  @Column({ type: 'int', nullable: true })
  size: number;

  @Column({ type: 'int', nullable: true })
  weight: number;

  @Column({ type: 'boolean', nullable: true })
  is_coinbase: boolean;

  @Column({ type: 'bigint', nullable: true })
  output_total: string; // TypeORM에서는 bigint를 string으로 다룸

  @Column({ type: 'double precision', nullable: true })
  output_total_usd: number;

  @Column({ type: 'bigint', nullable: true })
  fee: string; // bigint는 string으로 처리

  @Column({ type: 'double precision', nullable: true })
  fee_usd: number;

  @Column({ type: 'jsonb', nullable: true })
  details: object;
}
