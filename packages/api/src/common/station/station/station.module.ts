import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { StationEntity } from '../station/station.entity';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
  exports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
})
export class StationModule {}
