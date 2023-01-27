import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphqlCertModule } from './graphql/cert-graphql/cert-graphql.module';
import { GraphqlUserModule } from './graphql/user-graphql/user-graphql.module';
import { AuthModule } from './auth/auth.module';
import { EvmModule } from './evm/evm.module';

import ormconfig = require('../ormconfig');
import { GraphqlStationModule } from './common/charge-station/station-graphql/station-graphql.module';
import { GraphqlConnectorModule } from './common/charge-station/connector/connector-graphql/connector-graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      debug: false,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    GraphqlCertModule,
    GraphqlUserModule,
    GraphqlStationModule,
    GraphqlConnectorModule,
    AuthModule,
    EvmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
