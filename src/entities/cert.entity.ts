import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Cert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  singed_role1_id: number;

  @Column({ nullable: true })
  singed_role2_id: number;

  @Column({ nullable: true })
  singed_role4_id: number;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // public createdAt: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  //   onUpdate: 'CURRENT_TIMESTAMP(6)',
  // })
  // public updatedAt: Date;

  // @Column({ length: 50 })
  // reg_number: string;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // public dob: Date;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  middlename: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50 })
  sex: string;

  @Column({ length: 50 })
  single_twin: string;

  @Column({ length: 50 })
  ismultiple: string;

  @Column({ length: 50 })
  pb_name: string;

  @Column({ length: 50 })
  pb_street: string;

  @Column({ length: 50 })
  pb_city: string;

  @Column({ length: 50 })
  pb_country: string;

  @Column({ type: 'decimal', precision: 9, scale: 3, default: 0 })
  child_height: number;

  @Column({ type: 'decimal', precision: 9, scale: 3, default: 0 })
  child_weight: number;

  @Column({ nullable: true })
  child_blood: number;

  @Column({ length: 50 })
  p1_firstname: string;

  @Column({ length: 50 })
  p1_middlename: string;

  @Column({ length: 50 })
  p1_lastname: string;

  @Column({ length: 50 })
  p1_parent: string;

  @Column({ length: 50 })
  p1_pob: string;

  @Column({ nullable: true })
  p1_dob: Date;

  @Column({ length: 64 })
  ipfs_public_hash: string;

  @Column({ length: 64 })
  ipfs_private_hash: string;

  @Column({ length: 64 })
  ipfs_private_key: string;

  @ManyToOne(() => UserEntity, (user) => user.certs)
  user: UserEntity;
}
