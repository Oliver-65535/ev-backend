import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: User,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GraphqlUserModule {}
console.log(NestjsQueryGraphQLModule.forFeature);
