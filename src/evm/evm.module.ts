import { Module } from '@nestjs/common';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';

@Module({
  controllers: [EvmController],
  providers: [EvmService],
  exports: [EvmService],
})
export class EvmModule {}
