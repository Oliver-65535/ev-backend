import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OCPPService } from './ocpp-cs.service';

@Module({
  imports: [HttpModule],
  providers: [OCPPService],
})
export class OCPPModule {}
