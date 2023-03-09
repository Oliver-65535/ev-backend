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
import { Geometry, Point } from 'geojson';

import { ChargePointEntity } from '../../chargePoint/chargePoint/chargePoint.entity';
import { ConnectorEntity } from 'src/common/chargePoint/connector/connector.entity';

@Entity('Site')
export class SiteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  name!: string;

  @Column({ length: 50, nullable: true })
  site: string;

  @Column({ length: 50, nullable: true })
  site_area: string;

  @Column('geometry')
  location: Point;

  @Column({ length: 128, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  dynamic_asset: string;

  @Column({ length: 128, nullable: true })
  asset_type: string;

  @Column({ nullable: true })
  instant_power: number;

  @Column({ length: 50, nullable: true })
  battery: string;

  @OneToMany(() => ChargePointEntity, (chargePoint) => chargePoint.site, {
    cascade: true,
  })
  chargePoints: ChargePointEntity[];

  @OneToMany(() => ConnectorEntity, (connectors) => connectors.site)
  connectors: ConnectorEntity[];

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
