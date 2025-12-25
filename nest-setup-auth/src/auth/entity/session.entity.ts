import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('session') // 테이블 이름을 'session'으로 지정
export class SessionEntity {
  @PrimaryColumn({ type: 'varchar', collation: 'default' })
  sid: string;

  @Column({ type: 'json' })
  sess: any;

  @Index('IDX_session_expire') // 만료 시간 검색을 위한 인덱스
  @Column({ type: 'timestamp', precision: 6 })
  expire: Date;
}