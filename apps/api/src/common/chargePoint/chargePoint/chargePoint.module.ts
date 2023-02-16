import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { СhargePointEntity } from './chargePoint.entity';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([СhargePointEntity])],
  exports: [NestjsQueryTypeOrmModule.forFeature([СhargePointEntity])],
})
export class StationModule {}
