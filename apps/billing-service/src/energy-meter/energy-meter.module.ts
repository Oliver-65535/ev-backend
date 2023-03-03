import { EnergyMeterService } from './energy-meter.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EnergyMeterService],
  exports: [EnergyMeterService],
})
export class EnergyMeterModule {}
