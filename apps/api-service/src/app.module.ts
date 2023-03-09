import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConnectorModule } from './common/chargePoint/connector/connector-graphql/connector-graphql.module';
import { GraphqlSiteModule } from './common/site/site/site-graphql/site-graphql.module';
import { GraphqlСhargePointModule } from './common/chargePoint/chargePoint/chargePoint-graphql.module';
import { MapsApiModule } from './common/maps-api/maps-api.module';
import { Module } from '@nestjs/common';
import { OCPPModule } from './modules-microservices/ocpp-cs-service/ocpp-cs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './common/user/user.module';

import ormconfig = require('../ormconfig');

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
    GraphqlSiteModule,
    GraphqlСhargePointModule,
    GraphqlConnectorModule,
    UserModule,
    // AuthModule,
    MapsApiModule,
    OCPPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
