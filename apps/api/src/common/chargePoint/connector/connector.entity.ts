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

import { ChargePointEntity } from '../chargePoint/chargePoint.entity';
import { SiteEntity } from 'src/common/site/site/site.entity';

@Entity('Connector')
export class ConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  connectorId!: number;

  @Column({ length: 50 })
  connectorTypeName: string;

  @Column({ length: 50 })
  connectorTypeId: string;

  @Column({ default: 0 })
  statusId: number;

  @Column({ length: 50, default: 'Faulted' })
  statusName: string;

  @Column({ length: 128, default: 'None' })
  information: string;

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0 })
  instantPower: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0 })
  power: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0 })
  maxPower: number;

  @Column({ type: 'decimal', precision: 4, scale: 4, default: 0 })
  price: number;

  @Column({ length: 10, default: 'kW/h' })
  priceUnit: string;

  @Column({ type: 'decimal', precision: 6, scale: 3, default: 0 })
  consumption: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, default: 0 })
  inactivity: number;

  @ManyToOne(() => ChargePointEntity, (chargePoint) => chargePoint.connectors)
  chargePoint: ChargePointEntity;

  @ManyToOne(() => SiteEntity, (site) => site.connectors)
  site: SiteEntity;

  @Column({ nullable: true })
  chargePointId?: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  ocpp_event_timestamp: Date; // Creation date

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date; // Creation date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
