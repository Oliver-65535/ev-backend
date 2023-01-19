import {
  FilterableField,
  IDField,
  PagingStrategies,
  FilterableOffsetConnection,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';


@ObjectType('Station')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class StationDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  station_id!: string;

  @FilterableField({ nullable: true })
  latitude: string;

  @FilterableField({ nullable: true })
  longitude: string;

  @FilterableField({ nullable: true })
  address: string;

  @FilterableField({ nullable: true })
  connectors: string;

  @FilterableField({ nullable: true })
  is_active: boolean;
}
