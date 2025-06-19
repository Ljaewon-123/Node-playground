import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { CryptoTick } from './crypto-ticks.entity';

@Entity('crypto_assets')
export class CryptoAssets {
  @PrimaryColumn({ type: 'text' })
  symbol: string;

  @Column({ type: 'text' })
  name: string;

  // 하이퍼테이블과의 관계 (선택사항 - 성능상 주의)
  @OneToMany(() => CryptoTick, tick => tick.asset)
  ticks?: CryptoTick[];
}