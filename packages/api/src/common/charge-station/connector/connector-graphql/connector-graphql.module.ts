import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectorEntity } from 'src/common/charge-station/connector/connector.entity';
import { ConnectorDTO } from './dto/connector.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConnectorEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ConnectorEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: ConnectorDTO,
          EntityClass: ConnectorEntity,
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
export class GraphqlConnectorModule {}
// console.log(NestjsQueryGraphQLModule.forFeature);
