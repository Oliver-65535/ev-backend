import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';

import { StationDTO } from 'src/common/charge-station/station-graphql/dto/station.dto';

@ObjectType('Connector')
@Relation('station', () => StationDTO, {
  disableRemove: true,
  disableUpdate: true,
  enableTotalCount: true,
})

@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class ConnectorDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  connector!: string;

  @FilterableField({ nullable: true })
  connector_type!: string;

  @FilterableField({ nullable: true })
  status!: string;

  @FilterableField({ nullable: true })
  information!: string;

  @FilterableField({ nullable: true })
  instant_power!: string;

  @FilterableField({ nullable: true })
  consumption!: string;

  @FilterableField({ nullable: true })
  inactivity!: string;

  @FilterableField()
  stationId!: string;

}
