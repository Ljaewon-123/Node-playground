import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// 역할 종류를 정의합니다.
export enum UserRole {
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // 해싱된 비밀번호가 저장됩니다.

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST, // 기본값은 guest로 설정
  })
  role: UserRole;
}