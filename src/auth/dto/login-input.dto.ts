import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInputDTO {
  @Field()
  @IsString()
  publicAddress!: string;

  @Field()
  @IsString()
  message!: string;

  @Field()
  @IsString()
  signature!: string;
}
