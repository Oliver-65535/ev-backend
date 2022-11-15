import { Controller, Get } from '@nestjs/common';
import { EvmService } from './evm.service';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get()
  getEvmTest(): any {
    return this.evmService.ipfsSend({
      json1: 'json1-data',
      json2: 'json2-data',
    });
  }
}
