import { Field, InputType } from '@nestjs/graphql';

@InputType('UserInput')
export class UserInputDTO {
  @Field()
  account_id: string;


}