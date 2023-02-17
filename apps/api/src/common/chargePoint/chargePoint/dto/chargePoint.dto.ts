import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  FilterableUnPagedRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';

import { ConnectorDTO } from '../../connector/connector-graphql/dto/connector.dto';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('ChargePoint')
@FilterableUnPagedRelation('connectors', () => ConnectorDTO, {
  disableRemove: true,
  // disableUpdate: true,
  // enableTotalCount: true,
})
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class ChargePointDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  chargePointId: string;

  @FilterableField({ nullable: true })
  chargePointName: string;

  @FilterableField({ nullable: true })
  owner: string;

  @FilterableField({ nullable: true })
  status: string;

  // @Column('geometry')
  // location: Point;

  @FilterableField({ nullable: true })
  instantPower: number;

  @FilterableField({ nullable: true })
  public: boolean;

  @FilterableField({ nullable: true })
  ocpp_event_timestamp: Date; // Creation date

  @FilterableField({ nullable: true })
  created_at: Date; // Creation date

  @FilterableField({ nullable: true })
  updated_at: Date; // Last updated date

  @FilterableField({ nullable: true })
  deleted_at: Date; // Deletion date
}
