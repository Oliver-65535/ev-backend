import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { OCPPService } from './ocpp-cs/ocpp-server/ocpp-cs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  await app.startAllMicroservices();

  await app.listen(3021);
  const appService = app.get(OCPPService).getStart();
}
bootstrap();
