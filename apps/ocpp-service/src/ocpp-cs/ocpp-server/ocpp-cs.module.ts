import { Module } from '@nestjs/common';
import { OCPPService } from './ocpp-cs.service';
import { OcppController } from './ocpp-cs.controller';

@Module({
  imports: [],
  providers: [OCPPService],
  controllers: [OcppController],
})
export class OCPPModule {}
