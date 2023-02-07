import { Module } from '@nestjs/common';
import { OCPPService } from './ocpp-server.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OCPPService],
})
export class OCPPModule {}
