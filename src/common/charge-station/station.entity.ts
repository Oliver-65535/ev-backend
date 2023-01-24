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

  @Column("geometry")
  point: Point;

  @Column({ length: 50, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  connectors: string;

  @Column({ default: false })
  is_active: boolean;
}
