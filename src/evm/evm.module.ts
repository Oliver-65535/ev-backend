import { forwardRef, Module } from '@nestjs/common';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';
import { CertModule } from 'src/cert/cert.module';

@Module({
  imports: [forwardRef(() => CertModule)],
  controllers: [EvmController],
  providers: [EvmService],
  exports: [EvmService],
})
export class EvmModule {}
