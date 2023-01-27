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

  @Column("geometry")
  location: Point;

  @Column({ length: 128, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  connectors: string;

  @Column({ length: 128, nullable: true })
  instant_power: string;

  @Column({ default: false })
  public: boolean;
}
