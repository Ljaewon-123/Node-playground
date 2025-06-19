import { Hypertable, TimeColumn } from '@timescaledb/typeorm';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { CryptoAssets } from './crypto-assets.entity';

@Entity('crypto_ticks')
@Hypertable({
  compression: {
    compress: true, // 압축 활성화
    compress_orderby: 'time DESC', // 압축 시 정렬 기준
    compress_segmentby: 'symbol', // 압축 시 세그먼트 기준 (그룹화)
    policy: {
      schedule_interval: '7 days', // 7일마다 압축 실행
      compress_after: '1 day', // 1일 지난 데이터부터 압축
    },
  },
  // 데이터 보존 정책 (선택사항)
  retention: {
    drop_after: '1 year', // 1년 후 데이터 삭제
  },
})
export class CryptoTick {
  @TimeColumn() // TimescaleDB 전용 시간 컬럼 데코레이터
  time: Date;

  @PrimaryColumn({ type: 'text' })
  symbol: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'numeric', nullable: true })
  day_volume: string; // NUMERIC은 string으로 처리하는 것이 좋습니다

  // 관계형 데이터와의 연결 (선택사항)
  @ManyToOne(() => CryptoAssets, asset => asset.ticks)
  @JoinColumn({ name: 'symbol', referencedColumnName: 'symbol' })
  asset?: CryptoAssets;
}