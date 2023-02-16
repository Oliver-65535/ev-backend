import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { СhargePointEntity } from '../chargePoint/chargePoint.entity';

@Entity('Connector')
export class ConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  connectorId!: number;

  @Column({ length: 50, nullable: true })
  connector_type: string;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column({ length: 128, nullable: true })
  information: string;

  @Column({ type: 'decimal', precision: 4, scale: 4, default: 0 })
  instant_power: number;

  @Column({ type: 'decimal', precision: 5, scale: 3, default: 0 })
  consumption: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0 })
  inactivity: number;

  @ManyToOne(() => СhargePointEntity, (chargePoint) => chargePoint.connectors)
  chargePoint: СhargePointEntity;

  @Column({ nullable: true })
  chargePointId?: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
