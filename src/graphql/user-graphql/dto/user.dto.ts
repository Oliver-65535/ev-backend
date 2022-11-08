import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { CollectionDTO } from 'src/graphql/collection-graphql/dto/collection-graphql.dto';
import { InitializationDTO } from 'src/graphql/initialization-graphql/dto/initialization.dto';

@ObjectType('User')
@OffsetConnection('collections', () => CollectionDTO, {
  disableRemove: true,
  disableUpdate: true,
  enableTotalCount: true,
})
@OffsetConnection('initialization', () => InitializationDTO, {
  disableRemove: true,
  disableUpdate: true,
  enableTotalCount: true,
})
export class UserDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  account_id!: string;

  @FilterableField({ nullable: true })
  name!: string;

  @FilterableField({ nullable: true })
  avatar!: string;

  @FilterableField({ nullable: true })
  session!: string;

  @FilterableField({ nullable: true })
  collections!: string;

  @FilterableField({ nullable: true })
  initialization!: string;
}
