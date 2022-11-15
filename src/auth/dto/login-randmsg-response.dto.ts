import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType('RandomMessageResponse')
export class RandomMessageResponseDTO {
  @Field()
  @IsString()
  msg!: string;
}
