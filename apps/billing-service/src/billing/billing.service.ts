import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Transport,
} from '@nestjs/microservices';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
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

  handlePaymentEvent(data: any) {
    console.log('service', data);
    this.publishEvent({ publish: data });
  }

  publishEvent(params: any) {
    this.redisClient.emit('billing-channel', params);
  }
}
