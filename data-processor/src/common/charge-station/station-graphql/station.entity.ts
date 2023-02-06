import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ConnectorEntity } from '../connector/connector.entity';
import { Point } from 'geojson';
import { SiteEntity } from 'src/common/site/site/site.entity';

@Entity()
export class StationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 64 })
  station_id!: string;

  @Column({ length: 128, nullable: true })
  station_name: string;

  @Column({ length: 128, nullable: true })
  owner: string;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column('geometry')
  location: Point;

  @Column({ length: 128, nullable: true })
  address: string;

  @OneToMany(() => ConnectorEntity, (connectors) => connectors.station)
  connectors: ConnectorEntity[];

  @ManyToOne(() => SiteEntity, (site) => site.stations)
  site: SiteEntity;

  @Column({ length: 50, nullable: true })
  instant_power: string;

  @Column({ default: false })
  public: boolean;
}
