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
  connectorId!: number;

  @FilterableField({ nullable: true })
  connectorTypeName: string;

  @FilterableField({ nullable: true })
  connectorTypeId: string;

  @FilterableField({ nullable: true })
  statusId: number;

  @FilterableField({ nullable: true })
  statusName: string;

  @FilterableField({ nullable: true })
  information: string;

  @FilterableField({ nullable: true })
  instantPower: number;

  @FilterableField({ nullable: true })
  power: number;

  @FilterableField({ nullable: true })
  maxPower: number;

  @FilterableField({ nullable: true })
  price: number;

  @FilterableField({ nullable: true })
  priceUnit: string;

  @FilterableField({ nullable: true })
  consumption: number;

  @FilterableField({ nullable: true })
  inactivity: number;

  @FilterableField({ nullable: true })
  chargePointId?: number;

  @FilterableField({ nullable: true })
  created_at: Date; // Creation date

  @FilterableField({ nullable: true })
  updated_at: Date; // Last updated date

  @FilterableField({ nullable: true })
  deleted_at: Date; // Deletion date
}
