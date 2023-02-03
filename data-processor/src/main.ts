import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: process.env.REDIS_HOST,
  //     port: Number(process.env.REDIS_PORT),
  //   },
  // });

  // await app.startAllMicroservices();

  await app.listen(Number(process.env.BACKEND_PORT));
}
bootstrap();
