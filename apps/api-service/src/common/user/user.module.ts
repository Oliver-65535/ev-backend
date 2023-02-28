import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserEntity } from '../user/user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver],
  exports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
