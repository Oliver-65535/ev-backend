import {
  FilterableField,
  IDField,
  OffsetConnection,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { UserDTO } from 'src/graphql/user-graphql/dto/user.dto';

@ObjectType('Collections')
@Relation('user', () => UserDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class CertDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  singed_role1_id: number;

  @FilterableField({ nullable: true })
  singed_role2_id: number;

  @FilterableField({ nullable: true })
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

  @FilterableField({ nullable: true })
  firstname: string;

  @FilterableField({ nullable: true })
  middlename: string;

  @FilterableField({ nullable: true })
  lastname: string;

  @FilterableField({ nullable: true })
  sex: string;

  @FilterableField({ nullable: true })
  single_twin: string;

  @FilterableField({ nullable: true })
  ismultiple: string;

  @FilterableField({ nullable: true })
  pb_name: string;

  @FilterableField({ nullable: true })
  pb_street: string;

  @FilterableField({ nullable: true })
  pb_city: string;

  @FilterableField({ nullable: true })
  pb_country: string;

  @FilterableField({ nullable: true })
  child_height: number;

  @FilterableField({ nullable: true })
  child_weight: number;

  @FilterableField({ nullable: true })
  child_blood: number;

  @FilterableField({ nullable: true })
  p1_firstname: string;

  @FilterableField({ nullable: true })
  p1_middlename: string;

  @FilterableField({ nullable: true })
  p1_lastname: string;

  @FilterableField({ nullable: true })
  p1_parent: string;

  @FilterableField({ nullable: true })
  p1_pob: string;

  @FilterableField({ nullable: true })
  p1_dob: Date;

  @FilterableField({ nullable: true })
  ipfs_public_hash: string;

  @FilterableField({ nullable: true })
  ipfs_private_hash: string;

  @FilterableField({ nullable: true })
  ipfs_private_key: string;

  @FilterableField({ nullable: true })
  user!: string;
}
