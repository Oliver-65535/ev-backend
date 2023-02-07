import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OCPPModule } from './ocpp-server/ocpp-server.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OCPPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
