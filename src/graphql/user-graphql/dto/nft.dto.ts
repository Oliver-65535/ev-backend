import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('User')
export class UserDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  token_id!: string;

  @FilterableField()
  owner!: string;

  @FilterableField()
  sale!: string;

  @FilterableField()
  price!: string;

  @FilterableField()
  collection!: string;

}