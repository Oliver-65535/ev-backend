import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingModule } from './billing/billing.module';
import { ConfigModule } from '@nestjs/config';
import { EnergyMeterModule } from './energy-meter/energy-meter.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BillingModule,
    EnergyMeterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
