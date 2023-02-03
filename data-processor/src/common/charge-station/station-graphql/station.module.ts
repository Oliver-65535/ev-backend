import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { StationEntity } from '../station-graphql/station.entity';


@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
  exports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
})
export class StationModule {}
