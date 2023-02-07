import { MapsApiResolver } from './maps-api.resolver';
import { MapsApiService } from './maps-api.service';
import { Module } from '@nestjs/common';
import { StationModule } from '../station/station/station.module';

@Module({
  imports: [StationModule],
  providers: [MapsApiService, MapsApiResolver],
  exports: [MapsApiService],
})
export class MapsApiModule {}
