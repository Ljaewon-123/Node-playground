
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, Unique } from 'typeorm';

@Entity()
// @Unique(["id", "created_at"])
// @Index('grid_energy_snapshot_15_min_created_at_idx', [ 'created_at' ])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  is_active: boolean;

  @PrimaryGeneratedColumn()
  created_at: Date
}
