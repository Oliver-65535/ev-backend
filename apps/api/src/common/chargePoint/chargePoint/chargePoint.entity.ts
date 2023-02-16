import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConnectorEntity } from '../connector/connector.entity';
import { Point } from 'geojson';
import { SiteEntity } from 'src/common/site/site/site.entity';

@Entity('ChargePoint')
export class СhargePointEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 64 })
  сhargePointId!: string;

  @Column({ length: 128, nullable: true })
  сhargePointName: string;

  @Column({ length: 128, nullable: true })
  owner: string;

  @Column({ length: 50, nullable: true })
  status: string;

  // @Column('geometry')
  // location: Point;

  @Column({ length: 128, nullable: true })
  address: string;

  @OneToMany(() => ConnectorEntity, (connectors) => connectors.chargePoint)
  connectors: ConnectorEntity[];

  @ManyToOne(() => SiteEntity, (site) => site.chargePoints)
  site: SiteEntity;

  @Column({ type: 'decimal', precision: 6, scale: 3, default: 0 })
  instantPower: string;

  @Column({ default: false })
  public: boolean;

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
