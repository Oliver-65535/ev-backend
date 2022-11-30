import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: UserEntity,
          create: { disabled: false },
          update: { disabled: false },
          delete: { disabled: false },
          enableSubscriptions: true,
        },
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GraphqlUserModule {}
console.log(NestjsQueryGraphQLModule.forFeature);
