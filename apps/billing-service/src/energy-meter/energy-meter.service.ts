import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

@Injectable()
export class EnergyMeterService {
  redisClient: ClientProxy;
  chargeList = [];

  constructor() {
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }

  private readonly logger = new Logger(EnergyMeterService.name);

  @Cron('*/2 * * * * *')
  handleCron() {
    this.chargeList.forEach((element, index) => {
      if (this.chargeList[index].amount <= 0) this.stopCharge(1, index);
      else
        this.chargeList[index].amount = this.calcSpending(
          this.chargeList[index].amount,
          6,
          0.004,
          70,
        );
    });
  }

  startCharge(data): string {
    console.log('Hello EnergyMeterService !', data);
    this.chargeList.push(data);
    this.publishEvent({
      active: 'START_TRANSACTION',
      chargePointId: data.chargePointId,
      connectorId: data.connectorId,
    });
    return 'Hello EnergyMeterService !';
  }

  stopCharge(id, index) {
    console.log('Stop Transaction ID:', id);
    this.chargeList.splice(index, 1);
    this.publishEvent({
      active: 'STOP_TRANSACTION',
      transactionId: id,
    });
  }

  publishEvent(params: any) {
    this.redisClient.emit('billing-channel', params);
  }

  calcSpending(amount, power, time, price) {
    //5 sec = 0,004h
    // kwh = kw/h
    this.logger.debug(`NEXT Tick amount:${amount}`);
    const kWh = power * time;
    const spend = kWh * price;
    return amount - spend;
  }
}
