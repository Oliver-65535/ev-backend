import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

const { RPCServer, createRPCError } = require('ocpp-rpc');

require('dotenv').config();

const rpcServer = new RPCServer({
  protocols: ['ocpp1.6'], // server accepts ocpp1.6 subprotocol
  strictMode: true, // enable strict validation of requests & responses
});

rpcServer.auth((accept, reject, handshake) => {
  // accept the incoming client
  accept({
    // anything passed to accept() will be attached as a 'session' property of the client.
    sessionId: 'XYZ123',
  });
});

@Injectable()
export class OCPPService {
  redisClient: ClientProxy;

  constructor() {
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }

  async getStart() {
    rpcServer.on('client', async (client) => {
      // create a specific handler for handling BootNotification requests
      client.handle('BootNotification', ({ params }) => {
        console.log(
          `Server got BootNotification from ${client.identity}:`,
          params,
        );

        // save the client in the database
        // chargePoints[client.identity] = new ChargePoint(client.identity, client)
        this.publishEvent({
          chargeBoxId: client.identity,
          action: 'BootNotification',
          params: params,
        });
        // respond to accept the client
        return {
          status: 'Accepted',
          interval: 300,
          currentTime: new Date().toISOString(),
        };
      });

      client.on('disconnect', (params) => {
        console.log('Connection closed', params, client.identity);
        this.publishEvent({
          chargeBoxId: client.identity,
          action: 'disconnect',
          params: params,
        });
      });

      // create a specific handler for handling Heartbeat requests
      client.handle('Heartbeat', ({ params }) => {
        console.log(
          `Server got Heartbeat at ${new Date().toLocaleString('ru-RU', {
            timeZone: 'Europe/Moscow',
          })} from ${client.identity}:`,
          params,
        );
        this.publishEvent({
          chargeBoxId: client.identity,
          action: 'Heartbeat',
          params: params,
        });
        // respond with the server's current time.
        return {
          currentTime: new Date().toISOString(),
        };
      });

      // create a specific handler for handling StatusNotification requests
      client.handle('StatusNotification', ({ params }) => {
        console.log(
          `Server got StatusNotification from ${client.identity}:`,
          params,
        );

        // this.publishEvent({
        //   chargeBoxId: client.identity,
        //   action: 'StatusNotification',
        //   params: params,
        // });
        return {};
      });

      // handle StartTransaction requests
      client.handle('StartTransaction', ({ params }) => {
        // the charging station has started a transaction and wants to inform the server.
        console.log(
          `Server got StartTransaction from ${client.identity}:`,
          params,
        );

        return {
          idTagInfo: {
            status: 'Accepted', // idTag accepted
          },
          transactionId: 1, // the transactionId should relate to a record stored somewhere in your back-end
        };
      });

      // create a wildcard handler to handle any RPC method
      client.handle(({ method, params }) => {
        // This handler will be called if the incoming method cannot be handled elsewhere.
        console.log(
          `Server got ${method} from ${client.identity}:`,
          JSON.stringify(params, null, 2),
        );

        // throw an RPC error to inform the server that we don't understand the request.
        throw createRPCError('NotImplemented');
      });
    });

    await rpcServer.listen(3017);
  }

  async publishEvent(params: any) {
    this.redisClient.emit('ocpp-server-channel', params);
  }

  // async sendTransaction(connectorId, idTag) {
  //   // const response = await this.client.call('RemoteStartTransaction', {
  //   //   connectorId,
  //   //   idTag,
  //   // });
  //   // return response;
  // }
}
