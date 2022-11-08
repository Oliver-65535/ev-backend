import { NestjsQueryGraphQLModule, pubSubToken } from '@nestjs-query/query-graphql';
import { PostgresPubSub } from "graphql-postgres-subscriptions";
import { Client } from "pg";
import { Provider } from '@nestjs/common';



export class PostgresProvider {

  static provider(): Provider {
    const client = new Client({
        user: 'dbuser',
        host: '145.239.27.218',
        database: 'testdb',
        password: '1234',
        port: 5432,
      })
        client.connect()
        //const getDataLoader = () => new DataLoader()
        //console.log(client)
    return {
        
      provide: pubSubToken(),
      useValue: new PostgresPubSub({client}),
    };
  }
}