import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { BillingService } from './billing.service';
import { Controller } from '@nestjs/common';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('payment-channel')
  handleBookCreatedEvent(data: any) {
    this.billingService.handlePaymentEvent(data);
  }
}
