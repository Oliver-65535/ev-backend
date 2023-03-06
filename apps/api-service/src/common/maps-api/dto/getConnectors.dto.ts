import { Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType('InputConnectorsOnMarkerResponse')
export class InputConnectorsOnMarkerResponseDto {
  @Field()
  request!: string;
}
