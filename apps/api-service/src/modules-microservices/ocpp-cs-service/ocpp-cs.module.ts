import { ChargePointEntity } from 'src/common/chargePoint/chargePoint/chargePoint.entity';
import { ConnectorEntity } from 'src/common/chargePoint/connector/connector.entity';
import { MapsApiModule } from 'src/common/maps-api/maps-api.module';
import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OCPPController } from './ocpp-cs.controller';
import { OCPPService } from './ocpp-cs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { ActionReceipt } from 'src/entity-explorer/action_receipt_actions.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([ChargePointEntity]),
    NestjsQueryTypeOrmModule.forFeature([ConnectorEntity]),
    MapsApiModule,
  ],
  providers: [OCPPService],
  exports: [OCPPService /*TypeOrmModule*/],
  controllers: [OCPPController],
})
export class OCPPModule {}
