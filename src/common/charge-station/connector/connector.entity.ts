import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  BaseEntity,
} from 'typeorm';
import { Geometry, Point } from 'geojson';

import { StationEntity } from '../station-graphql/station.entity';

@Entity("connector")
export class ConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  connector!: string;

  @Column({ length: 50, nullable: true })
  connector_type: string;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column({ length: 128, nullable: true })
  information: string;

  @Column({ length: 128, nullable: true })
  instant_power: string;

  @Column({ length: 50, nullable: true })
  consumption: string;

  @Column({ length: 50, nullable: true })
  inactivity: string;

  @ManyToOne(() => StationEntity, (station) => station.connectors)
  station: StationEntity;
}
