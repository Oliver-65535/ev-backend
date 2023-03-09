import { Field, InputType, ObjectType } from '@nestjs/graphql';

import GraphQLJSON from 'graphql-type-json';

@ObjectType('ConnectorsOnMarkerResponse')
export class ConnectorsOnMarkerResponseDto {
  @Field()
  siteid: number;

  @Field((type) => GraphQLJSON)
  location!: JSON;

  @Field({ nullable: true })
  available: string;

  @Field({ nullable: true })
  total: string;
}

@InputType()
@ObjectType('InputFilterMarkers')
export class InputFilterMarkersDto {
  @Field((type) => GraphQLJSON)
  connectorTypesSelected: JSON;

  @Field((type) => GraphQLJSON)
  connectorStatusSelected: JSON;

  @Field({ nullable: true })
  minPower: number;

  @Field({ nullable: true })
  maxPower: number;

  @Field({ nullable: true })
  minPrice: number;

  @Field({ nullable: true })
  maxPrice: number;
}
