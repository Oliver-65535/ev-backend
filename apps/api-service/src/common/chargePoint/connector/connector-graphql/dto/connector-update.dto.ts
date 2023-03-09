import { IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('UserUpdate')
export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Field({ nullable: true })
  account_id?: string;

  @IsOptional()
  @Field({ nullable: true })
  name?: string;
}