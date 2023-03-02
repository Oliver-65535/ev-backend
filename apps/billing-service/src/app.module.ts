import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingModule } from './billing/billing.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
