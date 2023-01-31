import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ConnectorsOnMarkerResponse')
export class ConnectorsOnMarkerResponseDto {
  @Field()
  response!: string;
}

@ObjectType('InputConnectorsOnMarkerResponse')
export class InputConnectorsOnMarkerResponseDto {
  @Field()
  request!: string;
}