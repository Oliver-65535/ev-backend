import { MapsApiResolver } from './maps-api.resolver';
import { MapsApiService } from './maps-api.service';
import { Module } from '@nestjs/common';
import { StationModule } from '../chargePoint/chargePoint/chargePoint.module';

@Module({
  imports: [StationModule],
  providers: [MapsApiService, MapsApiResolver],
  exports: [MapsApiService, MapsApiResolver],
})
export class MapsApiModule {}
