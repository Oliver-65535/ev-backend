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

  @Column({ length: 50, nullable: true })
  instant_power: string;

  @Column({ default: false })
  public: boolean;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}
