import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LabOrder } from '../../lab-order/entities/lab-order.entity';

@Entity('lab_results')
export class LabResult {
  // Primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key column
  @Column({ name: 'lab_order_id', type: 'uuid', unique: true })
  labOrderId: string;

  // Result details
  @Column({ name: 'result_value', length: 255 })
  resultValue: string;

  @Column({ length: 50 })
  unit: string;

  @Column({ name: 'reference_range', length: 255, nullable: true })
  referenceRange?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ name: 'resulted_at', type: 'timestamptz' })
  resultedAt: Date;

  // Relationships
  @OneToOne(() => LabOrder, (labOrder) => labOrder.result, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lab_order_id' })
  labOrder: LabOrder;

  // Audit fields
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
