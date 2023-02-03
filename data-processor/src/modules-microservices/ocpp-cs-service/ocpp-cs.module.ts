import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
//import { ActionReceipt } from 'src/entity-explorer/action_receipt_actions.entity';
import { OCPPService } from './ocpp-cs.service';
import { OCPPController } from './ocpp-cs.controller';
import { StationEntity } from 'src/common/charge-station/station-graphql/station.entity';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
  providers: [OCPPService],
  exports: [OCPPService, /*TypeOrmModule*/],
  controllers: [OCPPController],
})
export class OCPPModule {}
