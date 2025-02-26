import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
  deletedAt?: Date | null;
}
