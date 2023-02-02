import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON,{ } from 'graphql-type-json';

@ObjectType('ConnectorsOnMarkerResponse')
export class ConnectorsOnMarkerResponseDto {
  @Field()
  count!: string;
  
  @Field((type) => GraphQLJSON)
  location!: JSON;
}

@ObjectType('InputConnectorsOnMarkerResponse')
export class InputConnectorsOnMarkerResponseDto {
  @Field()
  request!: string;
}

