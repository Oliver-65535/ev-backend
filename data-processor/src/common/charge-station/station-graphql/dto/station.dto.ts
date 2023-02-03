import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
  UnPagedRelation
} from '@nestjs-query/query-graphql';

import GraphQLJSON,{ } from 'graphql-type-json';
import { ConnectorDTO } from '../../connector/connector-graphql/dto/connector.dto';

@ObjectType('Station')

@UnPagedRelation('connectors', () => ConnectorDTO, {
  disableRemove: true,
  disableUpdate: true,
  enableTotalCount: true,
})

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
  station_name: string;

  @FilterableField({ nullable: true })
  owner: string;

  @FilterableField({ nullable: true })
  status: string;

  @FilterableField((type) => GraphQLJSON)
  location: JSON;

  @FilterableField({ nullable: true })
  address: string;

  @FilterableField({ nullable: true })
  connectors: string;

  @FilterableField({ nullable: true })
  instant_power: string;

  @FilterableField({ nullable: true })
  public: boolean;
}
