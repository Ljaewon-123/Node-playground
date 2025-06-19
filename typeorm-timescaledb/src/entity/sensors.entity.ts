// sensors.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SensorData } from './sensor-data.entity';

@Entity('sensors')
export class Sensors {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  location!: string | null;

  @OneToMany(() => SensorData, (data) => data.sensor)
  sensorData!: SensorData[];
}
