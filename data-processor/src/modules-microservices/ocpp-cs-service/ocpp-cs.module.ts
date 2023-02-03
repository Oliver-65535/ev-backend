import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ActionReceipt } from 'src/entity-explorer/action_receipt_actions.entity';
import { OCPPService } from './ocpp-cs.service';
import { OCPPController } from './ocpp-cs.controller';

@Module({
  imports: [],
  providers: [OCPPService],
  exports: [OCPPService, TypeOrmModule],
  controllers: [OCPPController],
})
export class OCPPModule {}
