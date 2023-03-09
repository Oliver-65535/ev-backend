import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RandomMessageInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  number!: string;
}

@InputType()
export class CertIDInputDTO {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
