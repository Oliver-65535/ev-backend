import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableUnPagedRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';

import GraphQLJSON from 'graphql-type-json';
import { StationDTO } from 'src/common/station/station/dto/station.dto';

@ObjectType('Site')
@FilterableUnPagedRelation('stations', () => StationDTO, {
  disableRemove: true,
  // disableUpdate: true,
  // enableTotalCount: true,
})
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class SiteDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  name!: string;

  @FilterableField({ nullable: true })
  site!: string;

  @FilterableField({ nullable: true })
  site_area!: string;

  @FilterableField((type) => GraphQLJSON)
  location: JSON;

  @FilterableField({ nullable: true })
  information!: string;

  @FilterableField({ nullable: true })
  dynamic_asset: string;

  @FilterableField({ nullable: true })
  asset_type!: string;

  @FilterableField({ nullable: true })
  instant_power!: string;

  @FilterableField({ nullable: false })
  battery!: string;
}
