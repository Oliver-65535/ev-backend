import { Module } from '@nestjs/common';

import { MapsApiService } from './maps-api.service';
import { MapsApiResolver } from './maps-api.resolver';
import { StationModule } from '../charge-station/station-graphql/station.module';

@Module({
  imports: [StationModule],
  providers: [MapsApiService, MapsApiResolver],
  exports: [MapsApiService],
})
export class MapsApiModule {}
