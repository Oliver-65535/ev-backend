import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphqlCertModule } from './graphql/cert-graphql/cert-graphql.module';
import { GraphqlUserModule } from './graphql/user-graphql/user-graphql.module';

import ormconfig = require('../ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      // subscriptions: {
      //   'graphql-ws': true,
      //   'subscriptions-transport-ws': true,
      // },
      driver: ApolloDriver,
      autoSchemaFile: true,
      //installSubscriptionHandlers: true,
    }),
    GraphqlCertModule,
    GraphqlUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
