import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

@InputType()
export class RandomMessageInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  wallet_eth!: string;
}
