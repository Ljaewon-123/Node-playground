// sensorData.ts
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hypertable, TimeColumn } from '@timescaledb/typeorm';
import { Sensors } from './sensors.entity';

@Entity('sensor_data')
@Hypertable({
  compression: {
    compress: true,
    compress_orderby: 'time',
    compress_segmentby: 'sensor_id',
    policy: {
      schedule_interval: '7 days',
    },
  },
})
export class SensorData {
  @TimeColumn()
  time!: Date;

  // 복합키를 위해 sensor_id를 PK로 지정
  @PrimaryColumn({ type: 'integer' })
  sensor_id!: number;

  @ManyToOne(() => Sensors, (sensor) => sensor.sensorData, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sensor_id' })
  sensor!: Sensors;

  @Column({ type: 'double precision', nullable: true })
  temperature!: number | null;

  @Column({ type: 'double precision', nullable: true })
  cpu!: number | null;
}
