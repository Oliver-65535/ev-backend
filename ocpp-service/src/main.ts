import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { OCPPService } from './ocpp-server/ocpp-server.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const appService = app.get(OCPPService).getStart();
}
bootstrap();
