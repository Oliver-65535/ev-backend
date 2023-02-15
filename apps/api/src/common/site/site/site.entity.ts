import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Geometry, Point } from 'geojson';

import { StationEntity } from '../../station/station/station.entity';

@Entity('site')
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

  @Column({ length: 50, nullable: true })
  dynamic_asset: string;

  @Column({ length: 128, nullable: true })
  asset_type: string;

  @Column({ nullable: true })
  instant_power: number;

  @Column({ length: 50, nullable: true })
  battery: string;

  @OneToMany(() => StationEntity, (station) => station.site, { cascade: true })
  stations: StationEntity[];
}
