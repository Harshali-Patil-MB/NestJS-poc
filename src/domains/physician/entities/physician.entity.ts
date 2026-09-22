import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LabOrder } from '../../lab-order/entities/lab-order.entity';

@Entity('physicians')
export class Physician {
  // Primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Physician details
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 150 })
  specialization: string;

  @Column({ name: 'license_number', unique: true, length: 100 })
  licenseNumber: string;

  // Relationships
  @OneToMany(() => LabOrder, (labOrder) => labOrder.physician)
  labOrders: LabOrder[];

  // Audit fields
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
