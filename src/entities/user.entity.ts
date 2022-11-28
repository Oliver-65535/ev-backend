import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Cert } from './cert.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ unique: true, length: 64 })
  wallet_eth: string;

  @Column({ default: false })
  is_active: boolean;

  @OneToMany(() => Cert, (cert) => cert.user, { eager: true })
  certs: Cert[];
}
