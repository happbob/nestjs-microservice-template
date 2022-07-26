import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AdminInfo')
export class AdminInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column()
  authority: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ default: 'ACTIVE' })
  status: string;
}
