import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LabOrder } from '../../lab-order/entities/lab-order.entity';

@Entity('patients')
export class Patient {
  // Primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Patient details
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: string;

  @Column({ length: 30 })
  gender: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 254 })
  email: string;

  // Relationships
  @OneToMany(() => LabOrder, (labOrder) => labOrder.patient)
  labOrders: LabOrder[];

  // Audit fields
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
