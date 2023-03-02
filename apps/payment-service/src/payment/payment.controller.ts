import { Controller, Get, Post, Req } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return 'nnn';
    // return this.paymentService.getHello();
  }

  @Get('/check')
  checkChannel(): any {
    const params: any = { hello: 'hello' };
    return this.paymentService.publishEvent(params);
  }

  @Post('/create-payment-intent')
  async getPaymentPost(@Req() request: Request): Promise<any> {
    return await this.paymentService.getPayment(request);
  }

  @Post('/webhook')
  async hookPaymentPost(@Req() request: Request): Promise<any> {
    // console.log(request.body);
    const ev: any = request;
    this.paymentService.hookPaymentEvent(ev);
  }
}
