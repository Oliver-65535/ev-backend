import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
export class StationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 64 })
  station_id!: string;

  @Column({ length: 50, nullable: true })
  latitude: string;
  
  @Column({ length: 50, nullable: true })
  longitude: string;

  @Column({ length: 50, nullable: true })
  address: string;

  @Column({ default: false })
  is_active: boolean;
}
