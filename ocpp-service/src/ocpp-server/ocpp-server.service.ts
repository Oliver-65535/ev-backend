import { Inject, Injectable } from '@nestjs/common';
import {
  OcppServer, OcppClientConnection, BootNotificationRequest, BootNotificationResponse,
} from 'ocpp-ts';
const { RPCServer, createRPCError } = require('ocpp-rpc');


import { HttpService } from '@nestjs/axios';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
require('dotenv').config();


const rpcServer = new RPCServer({
  protocols: ['ocpp1.6'], // server accepts ocpp1.6 subprotocol
  strictMode: true,       // enable strict validation of requests & responses
});

rpcServer.auth((accept, reject, handshake) => {
  // accept the incoming client
  accept({
      // anything passed to accept() will be attached as a 'session' property of the client.
      sessionId: 'XYZ123'
  });
});

const chargePoints = {};
const idTags = [];
const transactions = {};






@Injectable()
export class OCPPService {
  redisClient: ClientProxy;


  constructor(private readonly httpService: HttpService) {
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }
  

  async getStart() {
    // const centralSystemSimple = new OcppServer();
    // centralSystemSimple.listen(9220);
    // centralSystemSimple.on('connection', (client: OcppClientConnection) => {
    //   console.log(`Client ${client.getCpId()} connected`);
    //   client.on('close', (code: number, reason: Buffer) => {
    //     console.log(`Client ${client.getCpId()} closed connection`, code, reason.toString());
    //   });
    
    //   client.on('BootNotification', (request: BootNotificationRequest, cb: (response: BootNotificationResponse) => void) => {
    //     const response: BootNotificationResponse = {
    //       status: 'Accepted',
    //       currentTime: new Date().toISOString(),
    //       interval: 60,
    //     };
    //     cb(response);
    //   });
    // }); 

    rpcServer.on("client", async (client) => {
      // create a specific handler for handling BootNotification requests
      client.handle('BootNotification', ({ params }) => {
        console.log(`Server got BootNotification from ${client.identity}:`, params);
    
        // save the client in the database
        // chargePoints[client.identity] = new ChargePoint(client.identity, client)
        this.publishEvent({chargeBoxId:client.identity,action:"BootNotification", params:params})
        // respond to accept the client
        return {
          status: "Accepted",
          interval: 300,
          currentTime: new Date().toISOString()
        };
      });
    
      // create a specific handler for handling Heartbeat requests
      client.handle('Heartbeat', ({ params }) => {
        console.log(`Server got Heartbeat at ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} from ${client.identity}:`, params);
        this.publishEvent({chargeBoxId:client.identity,action:"Heartbeat", params:params})
        // respond with the server's current time.
        return {
          currentTime: new Date().toISOString()
        };
      });
    
      client.handle('closed', ({ params }) => {
        console.log(`Server got disconnected at ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} from ${client.identity}:`, params);
    
        // respond with the server's current time.
        return {
          currentTime: new Date().toISOString()
        };
      });
    
    
    
      // create a specific handler for handling StatusNotification requests
      client.handle('StatusNotification', ({ params }) => {
        console.log(`Server got StatusNotification from ${client.identity}:`, params);
        return {};
      });
    
      // handle StartTransaction requests
      client.handle('StartTransaction', ({ params }) => {
        // the charging station has started a transaction and wants to inform the server.
        console.log(`Server got StartTransaction from ${client.identity}:`, params);
    
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
        console.log(`Server got ${method} from ${client.identity}:`, JSON.stringify(params, null, 2));
    
        // throw an RPC error to inform the server that we don't understand the request.
        throw createRPCError("NotImplemented");
      });
    })
    
    await rpcServer.listen(3017);
  }

  async publishEvent( params: any) {
    this.redisClient.emit('ocpp-server-channel', params);
  }
}
