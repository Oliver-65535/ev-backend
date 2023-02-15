import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OCPPController } from './ocpp-cs.controller';
import { OCPPService } from './ocpp-cs.service';
import { StationEntity } from 'src/common/station/station/station.entity';
import { ConnectorEntity } from 'src/common/station/connector/connector.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { ActionReceipt } from 'src/entity-explorer/action_receipt_actions.entity';




@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([StationEntity]),
            NestjsQueryTypeOrmModule.forFeature([ConnectorEntity])],
  providers: [OCPPService],
  exports: [OCPPService /*TypeOrmModule*/],
  controllers: [OCPPController],
})
export class OCPPModule {}
