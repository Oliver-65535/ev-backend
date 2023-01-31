import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

@InputType()
export class RandomMessageInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  wallet_eth!: string;
}

@InputType()
export class CertIDInputDTO {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
