import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../../enums/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 64 })
  number: string;

  @Column({ length: 50, default: 'empty' })
  firstname: string;

  @Column({ length: 50, default: 'empty' })
  middlename: string;

  @Column({ length: 50, default: 'empty' })
  lastname: string;

  @Column({ type: 'enum', enum: Role, default: Role.Guest })
  role: Role;

  @Column({ default: false })
  is_active: boolean;
}
