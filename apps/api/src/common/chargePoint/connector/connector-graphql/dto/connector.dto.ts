import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';

import { ChargePointDTO } from 'src/common/chargePoint/chargePoint/dto/chargePoint.dto';

@ObjectType('Connector')
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
@Relation('chargePoint', () => ChargePointDTO, { disableRemove: true })
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
  stationId!: number;
}
