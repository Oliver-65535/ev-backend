import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  signatory1: number;

  @Column({ default: 0 })
  signatory2: number;

  @Column({ default: 0 })
  signatory3: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public datetime_of_birth: Date;

  @Column({
    nullable: true,
    // type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public dob_date: string;

  @Column({ nullable: true })
  public dob_time: string;

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
  child_blood: string;

  @Column({ length: 50, nullable: true })
  p1_firstname: string;

  @Column({ length: 50, nullable: true })
  p1_middlename: string;

  @Column({ length: 50, nullable: true })
  p1_lastname: string;

  @Column({ length: 50, nullable: true })
  p1_parent: string;

  @Column({ length: 50, nullable: true })
  p1_pob: string;

  @Column({ nullable: true })
  p1_dob: Date;

  @Column({ length: 50, nullable: true })
  p2_firstname: string;

  @Column({ length: 50, nullable: true })
  p2_middlename: string;

  @Column({ length: 50, nullable: true })
  p2_lastname: string;

  @Column({ length: 50, nullable: true })
  p2_parent: string;

  @Column({ length: 50, nullable: true })
  p2_pob: string;

  @Column({ nullable: true })
  p2_dob: Date;

  @Column({ length: 128 })
  ipfs_public_hash: string;

  @Column({ length: 128 })
  ipfs_private_hash: string;

  @Column({ length: 128 })
  ipfs_private_key: string;
}
