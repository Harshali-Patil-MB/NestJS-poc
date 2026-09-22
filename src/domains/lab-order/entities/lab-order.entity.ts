import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Physician } from '../../physician/entities/physician.entity';
import { LabTest } from '../../lab-test/entities/lab-test.entity';
import { LabResult } from '../../lab-result/entities/lab-result.entity';
import { LabOrderPriority } from '../enums/lab-order-priority.enum';
import { LabOrderStatus } from '../enums/lab-order-status.enum';

@Entity('lab_orders')
export class LabOrder {
  // Primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key columns
  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  @Column({ name: 'physician_id', type: 'uuid' })
  physicianId: string;

  @Column({ name: 'lab_test_id', type: 'uuid' })
  labTestId: string;

  @Column({
    type: 'enum',
    enum: LabOrderStatus,
    default: LabOrderStatus.ORDERED,
  })
  status: LabOrderStatus;

  @Column({
    type: 'enum',
    enum: LabOrderPriority,
    default: LabOrderPriority.NORMAL,
  })
  priority: LabOrderPriority;

  @Column({ name: 'ordered_at', type: 'timestamptz' })
  orderedAt: Date;

  // Relationships

  @ManyToOne(() => Patient, (patient) => patient.labOrders, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Physician, (physician) => physician.labOrders, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'physician_id' })
  physician: Physician;

  @ManyToOne(() => LabTest, (labTest) => labTest.labOrders, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'lab_test_id' })
  labTest: LabTest;

  @OneToOne(() => LabResult, (labResult) => labResult.labOrder)
  result?: LabResult;

  // Audit fields
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
