import { ConnectorDTO } from './dto/connector.dto';
import { ConnectorEntity } from 'src/common/chargePoint/connector/connector.entity';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          enableAggregate: true,
        },
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GraphqlConnectorModule {}
// console.log(NestjsQueryGraphQLModule.forFeature);
