import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { OCPPModule } from './ocpp-cs/ocpp-server/ocpp-cs.module';
import { OccpCsCallServiceTsService } from './ocpp-cs/occp-cs-call/occp-cs-call.service.ts.service';
import { OccpCsEventsService } from './ocpp-cs/occp-cs-events/occp-cs-events.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OCPPModule,
  ],
  controllers: [AppController],
  providers: [AppService, OccpCsCallServiceTsService, OccpCsEventsService],
})
export class AppModule {}
