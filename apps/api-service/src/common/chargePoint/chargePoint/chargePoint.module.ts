import { ChargePointEntity } from './chargePoint.entity';
import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([ChargePointEntity])],
  exports: [NestjsQueryTypeOrmModule.forFeature([ChargePointEntity])],
})
export class StationModule {}
