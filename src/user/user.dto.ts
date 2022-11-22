import { ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('UserAuth')
export class UserAuthDTO {
  @FilterableField()
  id!: number;

  @FilterableField()
  role!: string;

  @FilterableField()
  firstname!: string;

  @FilterableField()
  lastname!: string;

  @FilterableField()
  wallet_eth!: string;

  @FilterableField(() => GraphQLISODateTime)
  created!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date;
}
