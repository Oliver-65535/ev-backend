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

  @FilterableField()
  nfts!: string;

  @FilterableField({ nullable: true })
  img!: string;

  @FilterableField({ nullable: true })
  cover!: string;

  @FilterableField({ nullable: true })
  name!: string;

  @FilterableField({ nullable: true })
  description!: string;

  @FilterableField({ nullable: true })
  symbol!: string;

  @FilterableField()
  account_id!: string;

  @FilterableField({ nullable: true })
  creator!: string;

  @FilterableField({ nullable: true })
  price!: string;

  @FilterableField({ nullable: true })
  max_mint!: string;

  @FilterableField({ nullable: true })
  userId!: string;

  @FilterableField({ nullable: true })
  user!: string;

  @FilterableField({ nullable: true })
  status!: string;
}
