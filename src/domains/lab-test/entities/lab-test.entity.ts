import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LabOrder } from '../../lab-order/entities/lab-order.entity';

@Entity('lab_tests')
export class LabTest {
  // Primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Lab test details
  @Column({ length: 150 })
  name: string;

  @Column({ unique: true, length: 100 })
  code: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 100 })
  category: string;

  // Relationships
  @OneToMany(() => LabOrder, (labOrder) => labOrder.labTest)
  labOrders: LabOrder[];

  // Audit fields
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
