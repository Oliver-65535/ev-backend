import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app2 = await NestFactory.create(AppModule);
  app2.enableCors();

  const microserviceRedis = app2.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  await app2.startAllMicroservices();
  await app2.listen(Number(process.env.BACKEND_PORT));

}
bootstrap();
