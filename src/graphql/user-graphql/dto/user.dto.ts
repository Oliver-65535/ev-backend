import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { CertDTO } from 'src/graphql/cert-graphql/dto/cert-graphql.dto';
import { Role } from '../../../enums/role.enum';

@ObjectType('User')
@OffsetConnection('certs', () => CertDTO, {
  disableRemove: true,
  disableUpdate: true,
  enableTotalCount: true,
})
export class UserDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  certs!: string;

  @FilterableField({ nullable: true })
  firstname: string;

  @FilterableField({ nullable: true })
  lastname: string;

  @FilterableField({ nullable: true })
  username: string;
  @FilterableField({ nullable: true })
  password: string;

  @FilterableField({ nullable: true })
  role: Role;

  @FilterableField({ nullable: true })
  wallet_eth: string;

  @FilterableField({ nullable: true })
  is_active: boolean;
}
