import { EnergyMeterService } from 'src/energy-meter/energy-meter.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  constructor(private readonly energyMeterService: EnergyMeterService) {}

  handlePaymentEvent(data: any) {
    // console.log('BILLING', data);
    const data_in = {
      amount: data.amount / 100,
      chargepointId: JSON.parse(data.description).items[0].chargePointId,
      connectorId: JSON.parse(data.description).items[0].connectorId,
      id: data.id,
    };

    return this.energyMeterService.startCharge(data_in);
  }
}
